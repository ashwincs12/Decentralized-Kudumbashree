import React from "react";
import Dashname from "../components/Dashname";
import "../stylesheets/dashboardstyle.css"

export default function Publishnoti()
{
  return(
    <>
      <Dashname/> 
      <div className="ml-40 m-10">
        <section className="charts ml-40">
          <div className="chart-container p-3 charts m-">
            <h3 className="fs-3">PUBLISH NOTIFICATIONS</h3>
            <div className="flex flex-col space-y-4 p-10" style={{ height: '300px' }}>
              <input type="text" required className="form-control" placeholder="Notification Title" />
              <textarea className="form-control" required  rows="3" placeholder="Notification Description"></textarea>
              <input type="text" className="form-control" placeholder="Link" />
              <button type="submit" className="btn btn-success mx-auto">Submit</button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}