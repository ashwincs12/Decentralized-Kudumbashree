import React, { useState,useEffect } from 'react';
import PSDashname from '../components/PSDashname';
import abi from "../contracts/DK.json";
import {ethers} from 'ethers'

export default function ReqLoan() {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [currentTreasuryWorth, setcurrentTreasuryWorth] = useState(0);
  const [maximumEligibleAmount, setMaximumEligibleAmount] = useState(0);
  const [amountExceedsWarning, setAmountExceedsWarning] = useState(false);
  const [account,setAccount]=useState("Not Connected")


  const contractAddress=abi.address
  const contractABI=abi.abi

  useEffect( ()=>
  {
    const template=async()=>{

      try{
        const {ethereum}= window;
            const account = await ethereum.request({
              method:"eth_requestAccounts"
            })

            //Reload page when account is changed
            window.ethereum.on("accountsChanged",()=>
            {
              window.location.reload() 
            })

            //Setting current account address
            setAccount(account)

            const provider = new ethers.providers.Web3Provider(ethereum) //read from blockchain
            const signer = provider.getSigner(); //write into blockchain

            //Creating instance of contract
            const contract = new ethers.Contract(contractAddress,contractABI,signer)  

            // const currentTreasuryWorth=await contract.getContractBalance();
            // setcurrentTreasuryWorth(currentTreasuryWorth);

            const memdash = await contract.memdash()
            setMaximumEligibleAmount(memdash[0].toNumber()*4)

          }catch(err)
          {
            console.log(err)
          }
    }
    template();
  },[])


  const handleAmountChange = (e) => {
    const inputAmount = parseFloat(e.target.value);
    setEnteredAmount(e.target.value);

    if (inputAmount > maximumEligibleAmount) {
      setAmountExceedsWarning(true);
    } else {
      setAmountExceedsWarning(false);
    }
  };

  const handlePayNow = async () => {

    try
    {
      const {ethereum}= window;
      const provider = new ethers.providers.Web3Provider(ethereum) //read from blockchain
      const signer = provider.getSigner(); //write into blockchain
      const contract = new ethers.Contract(contractAddress,contractABI,signer)  
      await contract.createloan(enteredAmount)
    }catch(err)
    {
      console.log(err)
    }
    
  };

  return (
    <>
      <PSDashname account={account}/>
      <div className="text-white flex justify-center items-center h-screen">
        <div className="container text-center w-3/4">
          <div className="ml-40 mb-8">
            <p className="mb-2">Current Treasury Worth: {currentTreasuryWorth}</p>
            <p className="mb-2">Maximum eligible amount: {maximumEligibleAmount}</p>
          </div>
          <div className="flex items-center">
            <label htmlFor="amt" className="block mb-2 ml-60 mr-5">
              Enter your amount:
            </label>
            <input
              type="number"
              id="amt"
              name="amt"
              placeholder="Enter amount"
              className="px-4 py-2 text-black bg-white rounded-md w-1/2"
              value={enteredAmount}
              onChange={handleAmountChange}
            />
          </div>
          {amountExceedsWarning && (
            <p className="text-red-500 mt-2 ml-60">Requested amount should be lesser than the eligible amount</p>
          )}
          <button onClick={handlePayNow} className="bg-green-500 text-white px-6 py-3 text-lg rounded-md hover:bg-green-700 m-5 ml-40">
            Start Election
          </button>
        </div>
      </div>
    </>
  );
}
