import React from 'react'
import '../stylesheets/dashboardstyle.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function MDashname()
{
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
            <p className="mt-1 mb-0">Member</p>
          </div>
        </div>

        <div className="search position-relative text-center px-4 py-3 mt-2">
          <input type="text" className="form-control w-100 border-0 bg-transparent" placeholder="Search here" />
          <i className="fa fa-search position-absolute d-block fs-6"></i>
        </div>

        <ul class="categories list-unstyled">
        <li class="">
          <i class="uil-estate fa-fw"></i><Link to="/psdash/">Dashboards</Link>
        </li>
        <li class="">
          <i class="uil-money-bill"></i><Link to="/psdash/weeklypay/">Weekly Payments</Link>
        </li>
        <li class="">
          <i class="uil-money-bill"></i><Link to="/psdash/loanpay/">Loan Repayments</Link>
        </li>
        <li class="">
          <i class="uil-money-bill-stack"></i><Link to="/psdash/reqloan/">Request for Loan</Link>
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
            <div className="collapse navbar-collapse" id="toggle-navbar">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Settings
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href="#">My account</a>
                    </li>
                    <li><a className="dropdown-item" href="#">My inbox</a></li>
                    <li><a className="dropdown-item" href="#">Help</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Log out</a></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="uil-comments-alt"></i><span>23</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#"><i className="uil-bell"></i><span>98</span></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i data-show="show-side-navigation1" className="uil-bars show-side-btn"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
    
  )
}