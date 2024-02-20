import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
  

  return (
    <div className="grid place-content-center h-screen bg-opacity-5 font-nunito">
       
      <div className="onboard-container shadow-xl rounded-lg p-16 bg-white min-w-[500px] text-center">
        <h1 className="text-2xl mb-6">Register to D - Kudumbashree</h1>
        <p className="text-lg mb-8 desc"></p>
        <Link to="/">
        <button className="onboard bg-purple-600 text-white inline-block text-lg px-4 py-2 rounded-md"> Join an existing SHG</button>
        </Link>
        <p className="text-lg mb-8 desc"></p>
        <Link to="/">
        <button className="onboard bg-purple-600 text-white inline-block text-lg px-4 py-2 rounded-md"> Create a new SHG</button>
        </Link>

      </div>
    </div>
  );
};

export default Register;
