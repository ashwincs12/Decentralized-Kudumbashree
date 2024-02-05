import React, { useState } from 'react';
import PSDashname from '../components/PSDashname';

export default function Demote() {
  const allMembers = ['Member A', 'Member B', 'Member C', 'Member D', 'Member E']; // Replace with actual member names
  const [member1, setMember1] = useState(null);
  const [member2, setMember2] = useState(null);
  const [member3, setMember3] = useState(null);
  const [pollingTime, setPollingTime] = useState(null); // Add state variable for polling time

  const getAvailableMembers = (selectedMembers) => {
    return allMembers.filter((member) => !selectedMembers.includes(member));
  };

  const startElection = () => {
    alert('The election will be initiated...');
  };

  return (
    <>
      <PSDashname />
      <div className="text-white flex flex-col justify-center items-center h-screen">
        <div className="mb-4">
          <label htmlFor="member1" className="mr-2 text-lg font-bold">Candidate 1:</label>
          <select
            id="member1"
            value={member1 || ''}
            onChange={(e) => setMember1(e.target.value)}
            className="text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" className="text-black">Select Member</option>
            {getAvailableMembers([member2, member3]).map((member) => (
              <option key={member} value={member} className="text-black">{member}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="member2" className="mr-2 text-lg font-bold">Candidate 2:</label>
          <select
            id="member2"
            value={member2 || ''}
            onChange={(e) => setMember2(e.target.value)}
            className="text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" className="text-black">Select Member</option>
            {getAvailableMembers([member1, member3]).map((member) => (
              <option key={member} value={member} className="text-black">{member}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="member3" className="mr-2 text-lg font-bold">Candidate 3:</label>
          <select
            id="member3"
            value={member3 || ''}
            onChange={(e) => setMember3(e.target.value)}
            className="text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" className="text-black">Select Member</option>
            {getAvailableMembers([member1, member2]).map((member) => (
              <option key={member} value={member} className="text-black">{member}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="pollingTime" className="mr-2 text-lg font-bold">Polling time:</label> {/* Add polling time field */}
          <input
            type="time"
            id="pollingTime"
            value={pollingTime || ''}
            onChange={(e) => setPollingTime(e.target.value)}
            className="text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button className="bg-red-500 text-white px-6 py-3 text-lg rounded-md hover:bg-red-700" onClick={startElection}>
          Start Election
        </button>
      </div>
    </>
  );
}
