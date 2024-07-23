import React, { useState } from 'react';
import Profile from "../../Assets/profile-img.svg";
import "../../Common-Componet/common.css";
import "../Navbar/navbar.css";
import time2 from "../../Assets/time2.svg";
import drop3 from "../../Assets/drop3.svg";
import Frame from "../../Assets/Frame.svg";
import san3 from "../../Assets/san3.svg";

function Navbar() {
  const [isTimeContainerVisible, setIsTimeContainerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(''); // State to store selected time

  const toggleTimeContainer = () => {
    setIsTimeContainerVisible(!isTimeContainerVisible);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time); // Update selected time when a time frame is clicked
    setIsTimeContainerVisible(false); // Hide time container after selection (optional)
  };

  return (
    <div className="nav-container">
      <div className="top-sidebar-header">
        <img src={Frame} alt="Frame" />
        <h3>XenonTrace.AI</h3>
      </div>
      <div className="profile-contain-wrapper">
        <div className="profile-container-header">
          <img src={time2} alt="Frame" />
          <h3>Time: {selectedTime}</h3> {/* Display selected time here */}
          <img src={drop3} alt="Frame" onClick={toggleTimeContainer} style={{ cursor: 'pointer' }} />
        </div>
        {isTimeContainerVisible && (
          <div className="time-container">
            <div className="left-time-container">
              <h3>RELATIVE TIMES</h3>
              <div className='time-container-wrapper'>
                <div className='time-wrapper'>
                  <div className='time' onClick={() => handleTimeSelection('Last 3 hours')}>
                    <h3>Last 3 hours</h3>
                  </div>
                  <div className='time' onClick={() => handleTimeSelection('Last 4 days')}>
                    <h3>Last 4 days </h3>
                  </div>
                </div>
                <div className='time-wrapper'>
                  <div className='time' onClick={() => handleTimeSelection('Last 6 weeks')}>
                    <h3>Last 6 weeks</h3>
                  </div>
                  <div className='time' onClick={() => handleTimeSelection('Last 12 hours')}>
                    <h3>Last 12 hours</h3>
                  </div>
                </div>
                <div className='time-wrapper'>
                  <div className='time' onClick={() => handleTimeSelection('Last 10 days')}>
                    <h3>Last 10 days</h3>
                  </div>
                  <div className='time' onClick={() => handleTimeSelection('Last 2 weeks')}>
                    <h3>Last 2 weeks</h3>
                  </div>
                </div>
                <div className='time-wrapper'>
                  <div className='time' onClick={() => handleTimeSelection('Last 2 months')}>
                    <h3>Last 2 months</h3>
                  </div>
                  <div className='time' onClick={() => handleTimeSelection('Today')}>
                    <h3>Today</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="right-time-container">
              <div className='ti' onClick={() => handleTimeSelection('Last 5 minutes')}>
                <h3>Last 5 minutes</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 15 minutes')}>
                <h3>Last 15 minutes</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 20 minutes')}>
                <h3>Last 20 minutes</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 1 hour')}>
                <h3>Last 1 hour</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 6 hours')}>
                <h3>Last 6 hours</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 1 day')}>
                <h3>Last 1 day</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 3 days')}>
                <h3>Last 3 days</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Last 1 week')}>
                <h3>Last 1 week</h3>
              </div>
              <div className='ti' onClick={() => handleTimeSelection('Custom')}>
                <h3>Custom</h3>
              </div>
            </div>
          </div>
        )}
        <div className="profile-container">
          <h3>User</h3>
          <img src={san3} alt="Frame" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
