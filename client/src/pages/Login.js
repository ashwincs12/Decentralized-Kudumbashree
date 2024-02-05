import React from 'react';

const Login = () => {
  return (
    <div className="grid place-content-center h-screen bg-opacity-5 font-nunito">
      <div className="onboard-container shadow-xl rounded-lg p-16 bg-white min-w-[500px] text-center">
        <h1 className="text-2xl mb-6"></h1>
        <p className="text-lg mb-8 desc"></p>
        <button className="onboard bg-purple-600 text-white inline-block text-lg px-4 py-2 rounded-md"> Login</button>
      </div>
    </div>
  );
};

export default Login;
