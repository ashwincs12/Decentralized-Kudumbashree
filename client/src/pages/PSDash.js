import React from 'react'
import PSDashname from '../components/PSDashname'
import Notification from '../components/Notification'

export default function PSDash()
{
  return(
    <>
      <PSDashname/>

      {/* Greetings */}
      <div className="p-4 ml-60">
      <div className="welcome">
        <div className="content rounded-3 p-3">
          <h1 className="fs-3">Welcome to Dashboard</h1>
        </div>
      </div>
    </div>  
    
    {/* Statistics */}
    <section class="statistics mt-4 ml-60">
        <div class="row">
          <div class="col-lg-4">
            <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i class="uil-rupee-sign fs-2 text-center bg-success rounded-circle"></i>
              <div class="ms-3">
                <div class="d-flex align-items-center">
                  <h3 class="mb-0">6000</h3> <span class="d-block ms-2">INR</span>
                </div>
                <p class="fs-normal mb-0">Account Balance</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="box d-flex rounded-2 align-items-center mb-4 mb-lg-0 p-3">
              <i class="uil-invoice fs-2 text-center bg-danger rounded-circle"></i>
              <div class="ms-3">
                <div class="d-flex align-items-center">
                  <h3 class="mb-0">2575</h3> <span class="d-block ms-2">INR</span>
                </div>
                <p class="fs-normal mb-0">Loan Due Remaining</p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="box d-flex rounded-2 align-items-center p-3">
              <i class="uil-money-bill-stack fs-2 text-center bg-primary rounded-circle"></i>
              <div class="ms-3">
                <div class="d-flex align-items-center">
                  <h3 class="mb-0">32500</h3> <span class="d-block ms-2">INR</span>
                </div>
                <p class="fs-normal mb-0">SHG Net Worth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting alert */}
      <div class="pt-4 ml-60 pl-10 pr-10">
        <div class="welcome relative">
            <div class="content rounded-3 p-3">
                <p class="mb-0">Next meeting scheduled at 01/02/2024 04:00 PM</p>
                <button class="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded">Join Now</button>
            </div>
        </div>
    </div>

    {/* Notification */}
    <div className='ml-40 m-10'>
      <Notification/>
    </div>
    </>
  )
}