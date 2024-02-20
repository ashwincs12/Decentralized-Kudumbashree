import React from "react";
import Dashname from "../components/Dashname";
import "../stylesheets/dashboardstyle.css"

export default function ReviewSHG()
{
  return(
    <>
      <Dashname/>
      <div className="p-4 ml-60">
        <div className="welcome">
          <div className="content rounded-3 p-3 d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fs-3">Palakkad SHG</h1>
              <p className="mb-0">Request Submitted by: Niyathi</p>
            </div>
            <div className="location-text">
              <p>Location: Palakkad</p>
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