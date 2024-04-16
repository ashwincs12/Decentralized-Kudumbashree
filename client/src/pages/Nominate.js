import React, { useState, useEffect } from 'react';
import PSDashname from '../components/PSDashname';
import abi from "../contracts/DK.json";
import { ethers } from 'ethers';

export default function PSDash() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const template = async () => {
      const contractAddress = abi.address;
      const contractABI = abi.abi;

      try {
        //For metamask popup
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        //Reload page when account is changed
        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })

        //Setting current account address
        setAccount(account)

        const provider = new ethers.providers.Web3Provider(ethereum) //read from blockchain
        const signer = provider.getSigner(); //write into blockchain

        //Creating instance of contract
        const contract = new ethers.Contract(contractAddress, contractABI, signer)

        //Updating state
        setState({ provider, signer, contract })
      } catch (err) {
        alert(`${err.data.message}`);
        console.log(err)
      }
    }
    template()
  }, [])

  const handleNomination = async () => {
    try {
      // Call nominatePresident function
      await state.contract.nominatePresident();
      console.log("Nomination submitted successfully!");
    } catch (error) {
      console.error("Error submitting nomination:", error);
    }
  };

  return (
    <>
      <PSDashname account={account} />
      <div>
        <div className="ml-80 mt-20">
          <h3 className="text-2xl font-semibold text-white mb-4 ml-80 pl-40 pb-10">Election Nomination Disclaimer</h3>
          <div className="text-white text-lg mb-8">
            <p>
              By submitting your nomination for this election, you acknowledge and agree to uphold the responsibilities and duties associated with the position you are nominating for. Please consider your decision carefully before proceeding with your nomination.
            </p>
            <button className="bg-green-500 text-white py-2 px-4 m-20 ml-96 rounded" onClick={handleNomination}>Submit Nomination</button>
          </div>
        </div>
      </div>
    </>
  );
}
