import React from "react";
import PSDashname from "../components/PSDashname";
import "../stylesheets/dashboardstyle.css"

export default function ReviewMembers()
{
  return(
    <>
      <PSDashname/>
      <div className="p-4 ml-60">
        <div className="welcome">
          <div className="content rounded-3 p-3 d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fs-3">Niyathi Mariya George</h1>
              <p className="mb-0">Aadhaar : xxxx xxxx 0374</p>
            </div>
            <div className="location-text">
              <p>Location: Sreekrishnapuram</p>
            </div>
            <div>
              <button className="btn accept">Accept</button>
              <button className="btn reject">Reject</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}