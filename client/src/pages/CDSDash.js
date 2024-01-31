import React from 'react'
import Dashname from '../components/Dashname'

export default function CRSDash()
{
  return(
    <>
      <Dashname/>

      <div className="p-4 ml-60">
      <div className="welcome">
        <div className="content rounded-3 p-3">
          <h1 className="fs-3">Welcome to Dashboard</h1>
          <p className="mb-0">Hello NAME, welcome to your dashboard!</p>
        </div>
      </div>
    </div>  
    </>
  )
}