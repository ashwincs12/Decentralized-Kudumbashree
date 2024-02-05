import React from "react";
// import "../styles/macbookpro.css";
// import kudumbasreewomen from '../images/kudumbasree-women.png'
// import kudumbasreelogo from '../images/kudumbasree-logo.png'
export const Landing = () => {
  return (
    <div className=" bg-gray-300 flex flex-row justify-center w-full">
      <div className=" relative bg-gray-300 h-1117 w-full">
        <div className="absolute top-220 left-50 w-1678 h-873">
          <div className="absolute top-0 left-0 w-1678 h-873">
            <img
              className="object-cover w-1315 h-873 absolute top-0 left-363"
              alt="Election women"
              // src={kudumbasreewomen}
            />
               <div className="text-6xl font-semibold text-gray-900 font-worksans absolute left-0 top-57 w-1141">Welcome to D-Kudumbashree</div>
          </div>
         
          <div className="absolute top-315 left-0 w-312 h-87">
            <div className="relative rounded-full h-87 w-310">
              <div className="absolute top-0 left-0 w-310 h-87 bg-purple-700 rounded-full" />
              <div className="absolute top-20 left-65 text-white font-poppins-medium text-lg font-medium">Get Started</div>
            </div>
          </div>
        </div>
        <div className="absolute top-8 left-22 w-1661 h-153">
          {/* <img className="absolute top-0 left-0 w-175 h-153 object-cover" alt="Image" src={kudumbasreelogo} /> */}
          <div className="absolute top-42 left-1066 text-black font-poppins-medium text-lg font-medium">Home</div>
          <div className="absolute top-42 left-1526 text-black font-poppins-medium text-lg font-medium">Contact</div>
          <div className="absolute top-42 left-1376 text-black font-poppins-medium text-lg font-medium">Pricing</div>
          <div className="absolute top-42 left-1202 text-black font-poppins-medium text-lg font-medium">Services</div>
        </div>
      </div>
    </div>
  );
};