import React, { useEffect,useState } from 'react';
import '../stylesheets/dashboardstyle.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Dashname({account})
{
  let add1=account[0].slice(0,7)
  let add2=account[0].slice(-7)
  // console.log(account)
  return(
    <>
         <aside className="sidebar position-fixed top-0 left-0 overflow-auto h-100 float-left" id="show-side-navigation1">
        <i className="uil-bars close-aside d-md-none d-lg-none" data-close="show-side-navigation1"></i>
        <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-4">
          <img
            className="rounded-pill img-fluid"
            width="65"
            src="https://uniim1.shutterfly.com/ng/services/mediarender/THISLIFE/021036514417/media/23148907008/medium/1501685726/enhance"
            alt=""
          />
          <div className="ms-2">
            <h5 className="fs-6 mb-0">
              <a className="text-decoration-none" href="#">NAME</a>
            </h5>
            <p className="mt-1 mb-0">CDS Admin</p>
          </div>
        </div>

        <div className="search position-relative text-center px-4 py-3 mt-2">
          <input type="text" className="form-control w-100 border-0 bg-transparent" placeholder="Search here" />
          <i className="fa fa-search position-absolute d-block fs-6"></i>
        </div>

        <ul className="categories list-unstyled">
          <li className="">
            <i className="uil-estate fa-fw"></i><Link to="/cdsdash/">Dashboards</Link>
          </li>
          <li className="">
            <i className="uil-question-circle"></i> <Link to="/cdsdash/reviewshg">Review SHG Requests</Link>
          </li>
          <li className="">
            <i className="uil-bell"></i><Link to="/cdsdash/publishnoti">Publish Notifications</Link>
          </li>
        </ul>
      </aside>

      <section id="wrapper">
        <nav className="navbar navbar-expand-md">
          <div className="container-fluid mx-2">
            <div className="navbar-header">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#toggle-navbar" aria-controls="toggle-navbar" aria-expanded="false" aria-label="Toggle navigation">
                <i className="uil-bars text-white"></i>
              </button>
              <a className="navbar-brand" href="#">D - <span className="main-color">Kudumbashree</span></a>
            </div>
            <p class="message"></p>

          <button class="connect metamask-btn bg-blue-700 text-white px-8 py-4 text-2xl rounded-md">{add1}...{add2}</button>

          </div>
        </nav>
      </section>
    </>
    
  )
}