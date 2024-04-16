import React, { useEffect, useState } from "react";
import PSDashname from "../components/PSDashname";
import "../stylesheets/dashboardstyle.css";
import abi from "../contracts/DK.json";
import { ethers } from "ethers";

export default function ViewLoan() {
  const [account, setAccount] = useState("Not connected");
  const [loanRequests, setLoanRequests] = useState([]);
  const [contract, setContract] = useState(null);
  const [membersinSHG,setMembersinSHG]=useState(0);

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

        setContract(contract);

        const loanRequests = await contract.viewloan();
        setLoanRequests(loanRequests.map((loan) => ({
          ...loan,
          amount: loan.amount.toString(), // Convert BigNumber to string
        })));

        setMembersinSHG(await contract.getNumberOfMembersInSHG())

      } catch (err) {
        alert(`${err.data.message}`);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSupport = (index) => async () => {
    try {
      if (contract) {
        await contract.vote(index); 
        console.log("Voted for index:", index);
      }
    } catch (error) {
      alert(`${error.data.message}`);
      console.error("Error voting:", error);
    }
  };

  const handleClaimLoan = (index) => async () => {
    try {
      if (contract) {
        await contract.claimVote(index);
        console.log("Claimed loan for index:", index);
      }
    } catch (error) {
      alert(`Error claiming loan:${error.data.message}`);
      console.error("Error claiming loan:", error);
    }
  };

  function trimAddress(address) {
    if (!address) return '';
    const trimmedAddress = address.slice(0, 6) + '...' + address.slice(-2);
    return trimmedAddress;
  }

  return (
    <>
      <PSDashname account={account} />
      <div className="p-4 ml-60">
        {loanRequests.map((loan, index) => {
          const supportPercentage = loan.yesCount.toNumber() / membersinSHG * 100;
          const isApplicant = loan.applicant_add === account;
          return (
            <div className="welcome" key={index}>
              <div className="content rounded-3 p-3">
                <h1 className="fs-3">#{index + 1}</h1>
                <h1 className="fs-3">Applicant: {loan.applicant_name}</h1>
                <p> Address: {trimAddress(loan.applicant_add)}</p>
                <h1 className="fs-5">Amount: {loan.amount}</h1>
                <p>Completed: {loan.completed ? "Yes" : "No"}</p>
                <h1 className="fs-5">Support Percent: {supportPercentage.toFixed(2)}%</h1>

                <button className="btn support" onClick={handleSupport(index)}>
                  Support
                </button>
                
                  <button className="btn claim-loan" onClick={handleClaimLoan(index)}>
                    Claim Loan
                  </button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
