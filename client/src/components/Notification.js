import React from 'react'

function Notification() {
  return (
    <div> 
    <section className="charts ml-40">
    <div className="chart-container p-3 charts m-">
      <h3 className="fs-3">NOTIFICATIONS</h3>
      <div style={{ height: '300px' }}>
        <div className="notifications-container">
          <div className="notification-tile">
            <div className="notification-icon">
              <i className="uil-megaphone" style={{ fontSize: '60px', padding: '10px' }}></i>
            </div>
            <div className="notification-content">
              <div className="notification-date">Monday, January 30, 2024</div>
              <div className="notification-status new">New</div>
              <div className="notification-text">Applications are invited for internship ...</div>
              <a href="#" className="notification-read-more">Read More</a>
            </div>
          </div>
          {/* Repeat the above block for each notification */}
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Notification