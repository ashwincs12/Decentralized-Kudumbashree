import React, { useState, useEffect } from 'react';
import abi from "../contracts/DK.json";
import { ethers } from 'ethers';

function Notification() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contractAddress = abi.address;
        const contractABI = abi.abi;
        const { ethereum } = window;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        const notifications = await contract.getNotifications();
        setNotifications(notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div> 
      <section className="charts ml-40">
        <div className="chart-container p-3 charts m-">
          <h3 className="fs-3">NOTIFICATIONS</h3>
          <div style={{ height: '300px', overflowY: 'auto' }}>
            <div className="notifications-container">
              {notifications.map((notification, index) => (
                <div className="notification-tile" key={index}>
                  <div className="notification-icon">
                    <i className="uil-megaphone" style={{ fontSize: '60px', padding: '10px' }}></i>
                  </div>
                  <div className="notification-content">
                    <div className="notification-date">{notification.title}</div>
                    <div className="notification-text">{notification.desc}</div>
                    <a href={`https://${notification.link}`} target="_blank" rel="noopener noreferrer" className="notification-read-more">Read more...</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notification;
