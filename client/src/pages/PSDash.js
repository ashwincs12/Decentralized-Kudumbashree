import React,{useState,useEffect} from 'react'
import PSDashname from '../components/PSDashname'
import Notification from '../components/Notification'
import abi from "../contracts/DK.json";
import {ethers} from 'ethers'

export default function PSDash()
{
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount] = useState("Not connected")

  const [balance,setBalance]=useState(0);
  const [loan,setLoan]=useState(0);
  const [shgworth,setSHGWorth]=useState(0);

  
  useEffect(()=>
  {
    const template=async()=>
    {
      const contractAddress=abi.address
      const contractABI=abi.abi

      try{
        //For metamask popup
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

        //Updating state
        setState({provider,signer,contract})
        
        //cdsdashfunction
        const memdash = await contract.memdash();
        // Update state variables with returned values
        setBalance(memdash[0].toNumber());
        setLoan(memdash[1].toNumber());
        setSHGWorth(memdash[2].toNumber());

        console.log(balance,loan,shgworth)

      }catch(err)
      {
        console.log(err)
      }
    }
    template()
  },[balance,loan,shgworth])

  return(
    <>
      <PSDashname account={account} />

      {/* Greetings */}
      <div className="p-4 ml-60">
      <div className="welcome">
        <div className="content rounded-3 p-3">
          <h1 className="fs-3">Welcome to Dashboard</h1>
        </div>
      </div>
    </div>  
    
    {/* Statistics */}
    <section class="statistics mt-4 ml-60">
        <div class="row">
          <div class="col-lg-4">
            <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i class="uil-rupee-sign fs-2 text-center bg-success rounded-circle"></i>
              <div class="ms-3">
                <div class="d-flex align-items-center">
                  <h3 class="mb-0">{balance}</h3> <span class="d-block ms-2">INR</span>
                </div>
                <p class="fs-normal mb-0">Account Balance</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i class="uil-invoice fs-2 text-center bg-danger rounded-circle"></i>
              <div class="ms-3">
                <div class="d-flex align-items-center">
                  <h3 class="mb-0">{loan}</h3> <span class="d-block ms-2">INR</span>
                </div>
                <p class="fs-normal mb-0">Loan Due Remaining</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="box d-flex rounded-2 align-items-center p-3">
              <i class="uil-money-bill-stack fs-2 text-center bg-primary rounded-circle"></i>
              <div class="ms-3">
                <div class="d-flex align-items-center">
                  <h3 class="mb-0">{shgworth}</h3> <span class="d-block ms-2">INR</span>
                </div>
                <p class="fs-normal mb-0">SHG Net Worth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting alert */}
      <div class="pt-4 ml-60 pl-10 pr-10">
        <div class="welcome relative">
            <div class="content rounded-3 p-3">
                <p class="mb-0">Next meeting scheduled at 01/02/2024 04:00 PM</p>
                <button class="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded">Join Now</button>
            </div>
        </div>
    </div>

    {/* Notification */}
    <div className='ml-40 m-10'>
      <Notification/>
    </div>
    </>
  )
}