import React from 'react'
import abi from "../contracts/DK.json";
import {ethers} from 'ethers'

function SHGReg() {

  const handleSubmit=async(event)=>
  {
    event.preventDefault();
    const contractAddress=abi.address
    const contractABI=abi.abi
    try{
      //For metamask popup
      const {ethereum}= window;
      const account = await ethereum.request({
        method:"eth_requestAccounts"
      })
      const provider = new ethers.providers.Web3Provider(ethereum) //read from blockchain
      const signer = provider.getSigner(); //write into blockchain
      const contract = new ethers.Contract(contractAddress,contractABI,signer)

      const shgname=document.querySelector("#shgname").value
      const applicant=document.querySelector("#applicant").value
      const location =document.querySelector("#location").value
      console.log(shgname,applicant,location)

      await contract.createSHG(shgname,applicant,location)
      

    }catch(err)
    {
      console.log(err)
    }
  }
  return (
    <div className="container flex items-center justify-center h-screen">
    <div className="card rounded-lg shadow-md w-96 h-96 bg-white p-10">
      <div className="card_title text-center pb-4">
        <h1 className="text-2xl font-bold">Register New SHG</h1>
        <span>Make sure to have Metamask account  🦊  </span>
      </div>
      <div className="form mt-4">
        <form onSubmit={handleSubmit}>
          <input type="text" name="shgname" id="shgname" placeholder="SHGName" required className="block w-full bg-gray-300 border-none outline-none px-4 py-2 rounded-md mb-4" />
          <input type="text" name="applicant" placeholder="Applicant" id="applicant" required className="block w-full bg-gray-300 border-none outline-none px-4 py-2 rounded-md mb-4" />
          <input type="text" name="location" placeholder="Location" id="location" required className="block w-full bg-gray-300 border-none outline-none px-4 py-2 rounded-md mb-4" />
          <button type="submit" className="w-full bg-blue-500 text-white text-center font-semibold py-2 px-4 rounded-md">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default SHGReg