import React from 'react'
import MDashname from '../components/MDashname'
import Notification from '../components/Notification'

export default function MDash()
{
  return(
    <>
      <MDashname/>

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
                <h3 className="mb-0">25</h3> <span className="d-block ms-2">SHGs</span>
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
                <h3 className="mb-0">300</h3> <span className="d-block ms-2">Members</span>
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
                <h3 className="mb-0">5</h3> <span className="d-block ms-2">Pending</span>
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