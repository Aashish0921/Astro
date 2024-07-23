import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Common-Componet/common.css";
import "../User/user.css";
import "../Services/services.css";
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import Chat from '../Chat/chat.js';

function Services(props) {
    const [targets, setTargets] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTargets = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/targets');
                if (response.data.status === "success") {
                    setTargets(response.data.data.activeTargets);
                } else {
                    setError('Failed to fetch targets');
                }
            } catch (error) {
                setError('Error fetching targets: ' + error.message);
            }
        };

        fetchTargets();
    }, []);

    return (
        <div className="user-container">
            <Navbar />
            <div className="user-wrapper">
                <Sidebar />
                <div className='outer-service-wrapper'>
                <div className="user-inner-wrapper">
                    <div className="user-header-wrapper">
                        <div className="user-header">
                            <span>Services</span>
                        </div>
                        <p>Drawing insights from your application to monitor your application and suggest effective solutions.</p>
                    </div>
                    <div className="targets-wrapper">
                        {error && <div className="error">{error}</div>}
                        <table className="targets-table">
                            <thead>
                                <tr>
                                    <th>Endpoint</th>
                                    <th>State</th>
                                    <th>Labels</th>
                                    <th>Last Scrape</th>
                                    <th>Scrape Duration</th>
                                    <th>Error</th>
                                </tr>
                            </thead>
                            <tbody>
                                {targets.map((target, index) => (
                                    <tr key={index} className={target.health === "up" ? "healthy" : "unhealthy"}>
                                        <td><a href={target.scrapeUrl} target="_blank" rel="noopener noreferrer">{target.scrapeUrl}</a></td>
                                        <td className={target.health}>{target.health.toUpperCase()}</td>
                                        <td>
                                            {Object.keys(target.labels).map((key) => (
                                                <h3 key={key} className="label">{key}="{target.labels[key]}"</h3>
                                            ))}
                                        </td>
                                        <td>{target.lastScrape}</td>
                                        <td>{target.lastScrapeDuration}s</td>
                                        <td>{target.lastError ? target.lastError : "N/A"}</td>
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

export default Services;
