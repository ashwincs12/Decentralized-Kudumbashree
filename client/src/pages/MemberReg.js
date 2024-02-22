import React, { useState, useEffect } from 'react';
import abi from "../contracts/DK.json";
import { ethers } from 'ethers';

function MemberReg() {
  const [shgs, setSHGs] = useState([]);
  const [shgIndex, setSHGIndex] = useState(0);

  useEffect(() => {
    const fetchSHGs = async () => {
      try {
        const contractAddress = abi.address;
        const contractABI = abi.abi;
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);

        const approvedSHGs = await contract.getApprovedSHGs();
        setSHGs(approvedSHGs);
      } catch (error) {
        console.error('Error fetching approved SHGs:', error);
      }
    };

    fetchSHGs();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contractAddress = abi.address;
    const contractABI = abi.abi;
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const name = document.querySelector("#name").value;
      const aadhaar = document.querySelector("#aadhaar").value;
      const shgIndex = document.querySelector("#shgindex").value;
      console.log(name,aadhaar,shgIndex)

      await contract.memRegandJoin(name,aadhaar,shgIndex)

      // Your contract function call goes here
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="card rounded-lg shadow-md w-96 h-96 bg-white p-10">
        <div className="card_title text-center pb-4">
          <h1 className="text-2xl font-bold">Join a SHG</h1>
          <span>Make sure to have Metamask account 🦊 </span>
        </div>
        <div className="form mt-4">
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" id="name" placeholder="Name" required className="block w-full bg-gray-300 border-none outline-none px-4 py-2 rounded-md mb-4" />
            <input type="number" name="aadhaar" placeholder="Aadhaar" id="aadhaar" required className="block w-full bg-gray-300 border-none outline-none px-4 py-2 rounded-md mb-4" />
            <select name="shgindex" id="shgindex" value={shgIndex} onChange={(e) => setSHGIndex(e.target.value)} required className="block w-full bg-gray-300 border-none outline-none px-4 py-2 rounded-md mb-4">
              {shgs.map((shg, index) => (
                <option key={index} value={index}>{shg.name}</option>
              ))}
            </select>
            <button type="submit" className="w-full bg-blue-500 text-white text-center font-semibold py-2 px-4 rounded-md">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MemberReg;
