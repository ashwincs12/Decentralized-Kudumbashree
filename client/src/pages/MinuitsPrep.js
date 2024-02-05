import React, { useState } from 'react';
import PSDashname from '../components/PSDashname';

export default function MinutesPreparation() {
  const [primaryMatter, setPrimaryMatter] = useState('');
  const [membersPresent, setMembersPresent] = useState('');
  const [totalFundsCollected, setTotalFundsCollected] = useState('');
  const [otherDetails, setOtherDetails] = useState('');

  const handleSubmit = () => {
    // Logic to handle the submission of the form goes here.
    // For example, you could send this data to a server or use it in some other way.
    console.log({
      primaryMatter,
      membersPresent,
      totalFundsCollected,
      otherDetails,
    });
  };

  return (
    <>
      <PSDashname />
      <div className="text-white flex flex-col justify-center items-center h-screen">
        <input
          type="text"
          placeholder="Primary matter of discussion"
          value={primaryMatter}
          onChange={(e) => setPrimaryMatter(e.target.value)}
          className="mb-4 text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-50"
        />
        <input
          type="number"
          placeholder="Number of members present"
          value={membersPresent}
          onChange={(e) => setMembersPresent(e.target.value)}
          className="mb-4 text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-50"
        />
        <input
          type="text"
          placeholder="Total funds collected"
          value={totalFundsCollected}
          onChange={(e) => setTotalFundsCollected(e.target.value)}
          className="mb-4 text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-50"
        />
        <textarea
          placeholder="Any other important details"
          value={otherDetails}
          onChange={(e) => setOtherDetails(e.target.value)}
          className="mb-4 text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-50"
          rows="3"
        />
        <button
          className="bg-blue-500 text-white px-6 py-3 text-lg rounded-md hover:bg-blue-700 w-30"
          onClick={handleSubmit}
        >
          Publish Minuits
        </button>
      </div>
    </>
  );
}