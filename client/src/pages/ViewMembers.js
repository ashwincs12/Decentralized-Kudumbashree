import React, { useEffect, useState } from "react";
import Dashname from "../components/Dashname";
import "../stylesheets/dashboardstyle.css";
import abi from "../contracts/DK.json";
import { ethers } from "ethers";

export default function ViewMembers() {
  const [account, setAccount] = useState("Not connected");
  const [members, setMembers] = useState([]);
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

        const members = await contract.getMembers(); // Fetch all the members
        setMembers(members);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Dashname account={account} />
      <div className="p-4 ml-60">
        {members.map((member, index) => (
          <div className="welcome" key={index}>
            <div className="content rounded-3 p-3 d-flex justify-content-between align-items-center">
              <div>
                <h1 className="fs-3">{member.name}</h1>
                <p className="mb-0">Designation: {member.desig}</p>
                {/* <p className="mb-0">SHG Name: {member.shgName}</p> Assuming each member has a SHG name */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
