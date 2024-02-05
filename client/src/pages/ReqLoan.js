import React, { useState } from 'react';
import PSDashname from '../components/PSDashname';

export default function ReqLoan() {
  const [enteredAmount, setEnteredAmount] = useState('');
  const [currentSHGWorth, setCurrentSHGWorth] = useState(32500);
  const [maximumEligibleAmount, setMaximumEligibleAmount] = useState(30 * currentSHGWorth / 100);
  const [amountExceedsWarning, setAmountExceedsWarning] = useState(false);

  const handleAmountChange = (e) => {
    const inputAmount = parseFloat(e.target.value);
    setEnteredAmount(e.target.value);

    if (inputAmount > maximumEligibleAmount) {
      setAmountExceedsWarning(true);
    } else {
      setAmountExceedsWarning(false);
    }
  };

  const handlePayNow = () => {
    alert('Your request has been successfully submitted and the election will start soon...');
  };

  return (
    <>
      <PSDashname />
      <div className="text-white flex justify-center items-center h-screen">
        <div className="container text-center w-3/4">
          <div className="ml-40 mb-8">
            <p className="mb-2">Current SHG Worth: {currentSHGWorth}</p>
            <p className="mb-2">Maximum eligible amount: {maximumEligibleAmount}</p>
          </div>
          <div className="flex items-center">
            <label htmlFor="amt" className="block mb-2 ml-60 mr-5">
              Enter your amount:
            </label>
            <input
              type="number"
              id="amt"
              name="amt"
              placeholder="Enter amount"
              className="px-4 py-2 text-black bg-white rounded-md w-1/2"
              value={enteredAmount}
              onChange={handleAmountChange}
            />
          </div>
          {amountExceedsWarning && (
            <p className="text-red-500 mt-2 ml-60">Requested amount should be lesser than the eligible amount</p>
          )}
          <button onClick={handlePayNow} className="bg-green-500 text-white px-6 py-3 text-lg rounded-md hover:bg-green-700 m-5 ml-40">
            Start Election
          </button>
        </div>
      </div>
    </>
  );
}
