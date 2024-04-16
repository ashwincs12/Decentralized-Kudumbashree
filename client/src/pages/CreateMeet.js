import React, { useEffect, useState } from "react";
import PSDashname from "../components/PSDashname";
import "../stylesheets/dashboardstyle.css";
import abi from "../contracts/DK.json";
import { ethers } from 'ethers';

export default function CreateMeet() {
  const [account, setAccount] = useState("Not Connected");

  useEffect(() => {
    const template = async () => {
      try {
        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        // Reload page when account is changed
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Setting current account address
        setAccount(account);
      } catch (err) {
        alert(`${err.data.message}`);
      }
    };

    template();
  }, []);

  const handleSubmit = async () => {
    const contractAddress = abi.address;
    const contractABI = abi.abi;
    try {
      // For metamask popup
      const { ethereum } = window;
      const account = await ethereum.request({
        method: "eth_requestAccounts"
      });
      setAccount(account);
      const provider = new ethers.providers.Web3Provider(ethereum); // read from blockchain
      const signer = provider.getSigner(); // write into blockchain
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const agenta = document.querySelector("#agenta").value;
      const link = document.querySelector("#link").value;
      const time = document.querySelector("#time").value;
      const date = document.querySelector("#date").value;

      await contract.createMeet(agenta,link,time,date,true);
      const result = await contract.viewMeet()
      console.log(result)
    } catch (err) {
      alert(`${err.data.message}`);
      console.log(err);
    }
  };

  return (
    <>
      <PSDashname account={account} />
      <div className="ml-40 m-10">
        <section className="charts ml-40">
          <div className="chart-container p-3 charts m-">
            <h3 className="fs-3">Schedule Meeting</h3>
            <div className="flex flex-col space-y-4 p-10" style={{ height: '300px' }}>
              <input type="text" id="agenta" required className="form-control" placeholder="Meeting Agenta" />
              <input type="text" className="form-control" id="link" placeholder="Meeting Link" />
              <div className="flex">
                <input type="date" className="form-control mr-3" id="date" placeholder="Meeting Date" />
                <input type="time" className="form-control ml-3" id="time" placeholder="Meeting Time" />
              </div>
              <button type="submit" className="btn btn-success mx-auto mt-5" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
