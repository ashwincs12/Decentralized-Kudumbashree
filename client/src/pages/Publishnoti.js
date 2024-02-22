import React, {useEffect, useState} from "react";
import Dashname from "../components/Dashname";
import "../stylesheets/dashboardstyle.css"
import abi from "../contracts/DK.json";
import {ethers} from 'ethers'


export default function Publishnoti()
{
  const [account,setAccount]=useState("Not Connected")
  useEffect( ()=>
  {
    const template=async()=>{
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
    }
    template();
  },[])

  const handleSubmit=async()=>
  {
    const contractAddress=abi.address
    const contractABI=abi.abi
    try{
      //For metamask popup
      const {ethereum}= window;
      const account = await ethereum.request({
        method:"eth_requestAccounts"
      })
      setAccount(account)
      const provider = new ethers.providers.Web3Provider(ethereum) //read from blockchain
      const signer = provider.getSigner(); //write into blockchain
      const contract = new ethers.Contract(contractAddress,contractABI,signer)

      const title=document.querySelector("#title").value
      const desc=document.querySelector("#desc").value
      const link =document.querySelector("#link").value

      await contract.createNotification(title,desc,link)
      

    }catch(err)
    {
      console.log(err)
    }
  }
  return(
    <>
      <Dashname account={account}/> 
      <div className="ml-40 m-10">
        <section className="charts ml-40">
          <div className="chart-container p-3 charts m-">
            <h3 className="fs-3">PUBLISH NOTIFICATIONS</h3>
            <div className="flex flex-col space-y-4 p-10" style={{ height: '300px' }}>
                <input type="text" id="title" required className="form-control" placeholder="Notification Title" />
                <textarea className="form-control" id="desc" required  rows="3" placeholder="Notification Description"></textarea>
                <input type="text" className="form-control" id="link" placeholder="Link" />
                <button type="submit" className="btn btn-success mx-auto" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}