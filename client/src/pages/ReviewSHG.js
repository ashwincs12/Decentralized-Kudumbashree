import React, { useEffect, useState } from "react";
import Dashname from "../components/Dashname";
import "../stylesheets/dashboardstyle.css";
import abi from "../contracts/DK.json";
import { ethers } from "ethers";

export default function ReviewSHG() {
  const [account, setAccount] = useState("Not connected");
  const [pendingSHGs, setPendingSHGs] = useState([]);
  const [contract, setContract] = useState(null); // Add contract state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ethereum } = window;
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const contractAddress = abi.address;
        const contractABI = abi.abi;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setContract(contract); // Set the contract instance

        const pendingSHGs = await contract.getPendingSHGs();
        setPendingSHGs(pendingSHGs);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleAccept = (index) => async () => {
    try {
      if (contract) {
        await contract.approveSHG(index); // Call the approveSHG function
        console.log("SHG at index", index, "approved");
      }
    } catch (error) {
      console.error("Error approving SHG:", error);
    }
  };

  return (
    <>
      <Dashname account={account} />
      <div className="p-4 ml-60">
        {pendingSHGs.map((shg, index) => (
          <div className="welcome" key={index}>
            <div className="content rounded-3 p-3 d-flex justify-content-between align-items-center">
              <div>
                <h1 className="fs-3">{shg.name}</h1>
                <p className="mb-0">Request Submitted by: {shg.applicant}</p>
              </div>
              <div className="location-text">
                <p>Location: {shg.location}</p>
              </div>
              <div>
                <button className="btn accept" onClick={handleAccept(index)}>
                  Accept
                </button>
                <button className="btn reject">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
