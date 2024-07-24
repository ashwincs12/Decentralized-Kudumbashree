import React from "react";
import kudumbasreewomen from '../images/kudumbasree-women.png'
import kudumbasreelogo from '../images/kudumbasree-logo.png';
import "../stylesheets/Landing.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Landing(){
  alert("To avoid unexpected errors, please make sure that you have metamask extension enabled and the network is set to Ethereum HOLESKY. Thank You!")
  return (
    <div className="macbook-pro bg-white-500  ">
      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
            <img
              className="election-women"
              alt="Election women"
              src={kudumbasreewomen}// Remove the curly braces here
            />
            <div className="text-wrapper">Welcome to D-Kudumbashree</div>
          </div>
          <div className="group">
            <div className="overlap-group-2">
              <div className="rectangle" />
              <Link to="/login/">
              <div className="text-wrapper-2">Get Started</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="group-2">
          <img className="image" alt="Image" src={kudumbasreelogo} />
          <div className="text-wrapper-3">Home</div>
          <div className="text-wrapper-4">Contact</div>
          <div className="text-wrapper-5">Pricing</div>
          <div className="text-wrapper-6">Services</div>
        </div>
      </div>
    </div>
  );
};
