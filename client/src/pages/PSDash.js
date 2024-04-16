import React, { useState, useEffect } from 'react';
import PSDashname from '../components/PSDashname';
import Notification from '../components/Notification';
import abi from "../contracts/DK.json";
import { ethers } from 'ethers';

export default function PSDash() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  });
  const [account, setAccount] = useState("Not connected");

  const [balance, setBalance] = useState(0);
  const [loan, setLoan] = useState(0);
  const [shgworth, setSHGWorth] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [nominees, setNominees] = useState([]);

  useEffect(() => {
    const template = async () => {
      const contractAddress = abi.address;
      const contractABI = abi.abi;

      try {
        // For metamask popup
        const { ethereum } = window;
        ethereum.setMaxListeners(1);
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        });

        // Reload page when account is changed
        const handleAccountsChanged = () => {
          window.location.reload();
        };

        window.ethereum.on("accountsChanged", handleAccountsChanged);

        // Setting current account address
        setAccount(account);

        const provider = new ethers.providers.Web3Provider(ethereum); // read from blockchain
        const signer = provider.getSigner(); // write into blockchain

        // Creating instance of contract
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Updating state
        setState({ provider, signer, contract });

        // cdsdashfunction
        const memdash = await contract.memdash();
        // Update state variables with returned values
        setBalance(memdash[0].toNumber());
        setLoan(memdash[1].toNumber());
        setSHGWorth(memdash[2].toNumber());

        //Set Meeting Notification
        const meeting = await contract.viewMeet();


        // Check if president's tenure is over
        setShowPopup(await contract.checkPresidentTenureOver());

        // Fetch list of nominees
        const nomineeList = await contract.viewNominations();

        // Update the nominees state with the fetched list
        setNominees(nomineeList.map(nominee => ({
          name:nominee.name,
          address: nominee.nominee,
          timestamp: nominee.timestamp,
          count: nominee.supportCount
        })));

        if (state.contract) {
          const contractWithSigner = state.contract.connect(state.signer);
      
          // Listen for the NewPresidentAssigned event
          contractWithSigner.on('NewPresidentAssigned', (name) => {
            alert(`The new president is ${name}`);
          });
        }

        return () => {
          if (state.contract) {
            // Remove listener when the component is unmounted or dependencies change
            state.contract.removeAllListeners('NewPresidentAssigned');
          }
          // Remove accountsChanged listener
          window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
        
      } catch (err) {
        alert(`Error: ${err.message}`);
        console.log(err);
      }
    };
    template();
  }, [balance, loan, shgworth,state.contract, state.signer]);


  // Function to handle support button click
  const handleSupport = async (nomineeAddress) => {
    console.log("Supporting nominee:", nomineeAddress);
    await state.contract.voteNominee(nomineeAddress);
  };

  // Function to close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
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
      <section className="statistics mt-4 ml-60">
        <div className="row">
          <div className="col-lg-4">
            <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i className="uil-rupee-sign fs-2 text-center bg-success rounded-circle"></i>
              <div className="ms-3">
                <div className="d-flex align-items-center">
                  <h3 className="mb-0">{balance}</h3> <span className="d-block ms-2">INR</span>
                </div>
                <p className="fs-normal mb-0">Account Balance</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i className="uil-invoice fs-2 text-center bg-danger rounded-circle"></i>
              <div className="ms-3">
                <div className="d-flex align-items-center">
                  <h3 className="mb-0">{loan}</h3> <span className="d-block ms-2">INR</span>
                </div>
                <p className="fs-normal mb-0">Loan Due Remaining</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="box d-flex rounded-2 align-items-center p-3">
              <i className="uil-money-bill-stack fs-2 text-center bg-primary rounded-circle"></i>
              <div className="ms-3">
                <div className="d-flex align-items-center">
                  <h3 className="mb-0">{shgworth}</h3> <span className="d-block ms-2">INR</span>
                </div>
                <p className="fs-normal mb-0">SHG Net Worth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting alert */}
      <div className="pt-4 ml-60 pl-10 pr-10">
        <div className="welcome relative">
          <div className="content rounded-3 p-3">
            {/* <p className="mb-0">Next meeting scheduled at 01/02/2024 04:00 PM</p> */}
            <p className="mb-0">  </p>
            <button className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded">Join Now</button>
          </div>
        </div>
      </div>

      {/* Notification */}
      <div className="ml-40 m-10">
        <Notification />
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>President's Tenure Over</h2>
            <p>The President's tenure is over.</p>
            {/* List of Nominees */}
            <h3>List of Nominees:</h3>
            <div className="nominees-container">
              {nominees.map((nominee, index) => (
                <div key={index} className="nominee">
                  <div>
                    <strong>Name:</strong>{nominee.name}
                  </div>
                  <div>
                    <strong>Address:</strong>{nominee.address.substring(0, 4)}...{nominee.address.substring(nominee.address.length - 3)}
                  </div>
                  <div>
                    <strong>Timestamp:</strong> {new Date(nominee.timestamp * 1000).toLocaleString()}
                  </div>
                  <div>
                    <strong>Support Count:</strong> {nominee.count.toNumber()}
                  </div>
                  {/* Support Button */}
                  <button className="support-btn" onClick={() => handleSupport(nominee.address)}>Support</button>
                </div>
              ))}
            </div>
            {/* Close Button */}
            <button className="close-btn" onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}
