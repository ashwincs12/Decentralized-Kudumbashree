import React, { useState } from 'react';
import PSDashname from '../components/PSDashname';

export default function WeeklyPayment() {
  const initialBalance = 6000;
  const [amt, setAmt] = useState('');
  const [balance, setBalance] = useState(initialBalance);

  const handleAmountChange = (e) => {
    const inputAmt = e.target.value;
    setAmt(inputAmt);
    const updatedBalance = inputAmt ? initialBalance + parseFloat(inputAmt) : initialBalance;
    setBalance(updatedBalance);
  };

  return (
    <>
      <PSDashname />
      <div className="text-white flex justify-center items-center h-screen">
        <div className="container text-center w-3/4">
          <div className="flex items-center mb-8 ">
            <label htmlFor="amt" className="block mb-2 ml-60 mr-5">
              Enter your amount:
            </label>
            <input
              type="number"
              id="amt"
              name="amt"
              placeholder="Enter amount"
              className="px-4 py-2 text-black bg-white rounded-md w-1/2"
              value={amt}
              onChange={handleAmountChange}
            />
          </div>
          {amt && <p className='text-green-500'>Your updated balance would be: {balance}</p>}
          <button className="bg-green-500 text-white px-6 py-3 text-lg rounded-md hover:bg-green-700 m-5 justify-normal">
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}
