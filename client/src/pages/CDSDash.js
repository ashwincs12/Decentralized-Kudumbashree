import React, { useEffect,useState } from 'react';
import Dashname from '../components/Dashname'
import Notification from '../components/Notification'
//Web3 imports
import abi from "../contracts/DK.json";
import {ethers} from 'ethers'


export default function CRSDash()
{
  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [account,setAccount] = useState("Not connected")

  const [approvedSHGs,setApprovedSHGs]=useState(0);
  const [members,setMembers]=useState(0);
  const [pendingSHGs,setPendingSHGs]=useState(0);

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
        const cdsdash = await contract.cdsdash();
        // Update state variables with returned values
        setApprovedSHGs(cdsdash[0].toNumber());
        setMembers(cdsdash[1].toNumber());
        setPendingSHGs(cdsdash[2].toNumber());

        console.log(approvedSHGs,members,pendingSHGs)

      }catch(err)
      {
        alert(`Metamask connection failed. Please install metamask and switch to amoy network!`);
        console.log(err)
      }
    }
    template()
  },[approvedSHGs,members,pendingSHGs])

  return(
    <>
      <Dashname account={account}/>

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
            <i className="uil-building fs-2 text-center bg-primary rounded-circle"></i>
            <div className="ms-3">
              <div className="d-flex align-items-center">
                <h3 className="mb-0">{approvedSHGs}</h3> <span className="d-block ms-2">SHGs</span>
              </div>
              <p className="fs-normal mb-0">Registered</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
            <i className="uil-users-alt fs-2 text-center bg-success rounded-circle"></i>
            <div className="ms-3">
              <div className="d-flex align-items-center">
                <h3 className="mb-0">{members}</h3> <span className="d-block ms-2">Members</span>
              </div>
              <p className="fs-normal mb-0">Registered</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="box d-flex rounded-2 align-items-center p-3">
            <i className="uil-question-circle fs-2 text-center bg-danger rounded-circle"></i>
            <div className="ms-3">
              <div className="d-flex align-items-center">
                <h3 className="mb-0">{pendingSHGs}</h3> <span className="d-block ms-2">Pending</span>
              </div>
              <p className="fs-normal mb-0">SHG Approvals</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Notification */}
    <div className='ml-40 m-10'>
      <Notification/>
    </div>
    </>
  )
}