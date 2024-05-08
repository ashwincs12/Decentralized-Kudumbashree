import React, { useState, useEffect, useMemo } from 'react';
import ChatBot from 'react-simple-chatbot';
import jsPDF from 'jspdf';
import PSDashname from '../components/PSDashname';

const Review = ({ steps }) => {
  const { meetingNo, meetingDate, meetingAgenda, specialNotes, nextMeeting } = steps;

  useEffect(() => {
    const generatePdf = () => {
      const doc = new jsPDF();
      doc.text(`The ${meetingNo.value}th meeting was conducted on ${meetingDate.value} and the agenda was ${meetingAgenda.value}. ${specialNotes.value}. Next meeting scheduled on ${nextMeeting.value}.`, 10, 10);
      doc.save(`MeetingSummary_${meetingNo.value}.pdf`);
    };

    generatePdf();
  }, [meetingNo, meetingDate, meetingAgenda, specialNotes, nextMeeting]);

  return (
    <div style={{ width: '100%' }}>
      <h3>Meeting Summary</h3>
      <table>
        <tbody>
          <tr>
            <td>Meeting Number</td>
            <td>{meetingNo.value}</td>
          </tr>
          <tr>
            <td>Meeting Date and Time</td>
            <td>{meetingDate.value}</td>
          </tr>
          <tr>
            <td>Meeting Agenda</td>
            <td>{meetingAgenda.value}</td>
          </tr>
          <tr>
            <td>Special Notes</td>
            <td>{specialNotes.value}</td>
          </tr>
          <tr>
            <td>Next Meeting</td>
            <td>{nextMeeting.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default function MinuitsPrep() {
  const [account, setAccount] = useState("Not connected");

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);
        } catch (err) {
          alert(`${err.message}`);
        }
      } else {
        alert('Please install MetaMask to use this feature.');
      }
    };

    connectWallet();
  }, []);

  const steps = useMemo(() => [
    {
      id: '1',
      message: 'What is the meeting number?',
      trigger: 'meetingNo',
    },
    {
      id: 'meetingNo',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'What is the meeting date and time?',
      trigger: 'meetingDate',
    },
    {
      id: 'meetingDate',
      user: true,
      trigger: '4',
    },
    {
      id: '4',
      message: 'What is the meeting agenda?',
      trigger: 'meetingAgenda',
    },
    {
      id: 'meetingAgenda',
      user: true,
      trigger: '5',
    },
    {
      id: '5',
      message: 'Any special notes?',
      trigger: 'specialNotes',
    },
    {
      id: 'specialNotes',
      user: true,
      trigger: '6',
    },
    {
      id: '6',
      message: 'When is the next meeting?',
      trigger: 'nextMeeting',
    },
    {
      id: 'nextMeeting',
      user: true,
      trigger: 'review',
    },
    {
      id: 'review',
      component: <Review />,
      asMessage: true,
      end: true,
    },
  ], []);

  return (
    <>
      <PSDashname account={account} />
      <div className="App flex justify-center items-center h-screen">
        <ChatBot steps={steps} />
      </div>
    </>
  );
}
