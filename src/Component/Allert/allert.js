import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Common-Componet/common.css";
import "../User/user.css";
import "../Allert/allert.css"
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import Chat from '../Chat/chat.js';

function Allert(props) {
    const [alerts, setAlerts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:9093/api/v2/alerts');
                setAlerts(response.data);
            } catch (error) {
                setError('Error fetching alerts: ' + error.message);
            }
        };

        fetchAlerts();
    }, []);

    return (
        <div className="user-container">
            <Navbar />
            <div className="user-wrapper">
                <Sidebar />
                <div className='outside-allerts-wrapper'>
                    <div className="user-inner-wrapper">
                        <div className="user-header-wrapper">
                            <div className="user-header">
                                <span>Alerts</span>
                            </div>
                            <p>Drawing insights from your application to monitor your application and suggest effective solutions.</p>
                        </div>
                        <div className="alerts-wrapper">
                            {error && <div className="error">{error}</div>}
                            <table className="alerts-table">
                                <thead>
                                    <tr>
                                        <th>Alert Name</th>
                                        <th>Instance</th>
                                        <th>Job</th>
                                        <th>Severity</th>
                                        <th>Description</th>
                                        <th>State</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alerts.map((alert, index) => (
                                        <tr key={index} className={alert.status.state}>
                                            <td>{alert.labels.alertname}</td>
                                            <td>{alert.labels.instance}</td>
                                            <td>{alert.labels.job}</td>
                                            <td>{alert.labels.severity}</td>
                                            <td>{alert.annotations.description}</td>
                                            <td>{alert.status.state}</td>
                                            <td>{new Date(alert.startsAt).toLocaleString()}</td>
                                            <td>{alert.endsAt ? new Date(alert.endsAt).toLocaleString() : 'N/A'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Chat/>
            </div>
        </div>
    );
}

export default Allert;
