import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
  return (
    <div className="grid place-content-center h-screen bg-opacity-5 font-nunito">
       
      <div className="onboard-container shadow-xl rounded-lg p-16 bg-white min-w-[500px] text-center">
        <h1 className="text-2xl mb-6">Login to D - Kudumbashree</h1>
        <p className="text-lg mb-8 desc"></p>
        <Link to="/cdsdash/">
        <button className="onboard bg-purple-600 text-white inline-block text-lg px-4 py-2 rounded-md"> Login as CDS Admin</button>
        </Link>
        <p className="text-lg mb-8 desc"></p>
        <Link to="/psdash/">
        <button className="onboard bg-purple-600 text-white inline-block text-lg px-4 py-2 rounded-md"> Login as President</button>
        </Link>
        <p className="text-lg mb-8 desc"></p>
        <Link to="/mdash/">
        <button className="onboard bg-purple-600 text-white inline-block text-lg px-4 py-2 rounded-md"> Login as Member</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
