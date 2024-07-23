import React, { useState, useEffect } from 'react';
import drop from "../Assets/drop.svg";
import drop1 from "../Assets/drop1.svg";
import axios from 'axios';
import "../Common-Componet/common.css";
import "../User/user.css";
import "../Traces/traces.css";
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import Chat from '../Chat/chat.js';
import { Link } from 'react-router-dom';
import ReactSpeedometer from "react-d3-speedometer";
import GaugeChart from 'react-gauge-chart';

function Dashboard() {
    const [traces, setTraces] = useState([]);
    const [error, setError] = useState(null);
    const [expandedTraceID, setExpandedTraceID] = useState(null);

    useEffect(() => {
        const fetchTraces = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8001/traces');
                setTraces(response.data);
            } catch (error) {
                setError('Error fetching traces: ' + error.message);
            }
        };

        fetchTraces();
    }, []);
    const maxValue = 100;
    const value = 70;

    const calculateTimeTaken = (spans) => {
        const totalDuration = spans.reduce((acc, span) => acc + span.duration, 0);
        return `${(totalDuration / 1000).toFixed(2)}ms`; // converting µs to ms
    };

    const toggleExpand = (traceID) => {
        setExpandedTraceID(expandedTraceID === traceID ? null : traceID);
    };

    return (
        <div className="user-container">
            <Navbar />
            <div className="user-wrapper">
                <Sidebar />
                <div className='outside-dashboard-wrapper'>
                    <div className="user-inner-wrapper">
                        <div className="user-header-wrapper">
                            <div className="user-header">
                                <span>Traces</span>
                            </div>
                            <p>Drawing insights from your application to monitor your application and suggest effective solutions.</p>
                        </div>

                        <div className='user-traces-wrapper'>
                            <div className='services-header'>
                                <h2>Traces</h2>
                                <div className='services-left'>
                                    <div className='more-details'>
                                        <img src={drop1} alt="Frame" />
                                    </div>
                                </div>
                            </div>
                            <div className='bottom-traces'>
                                <div className="top-traces">
                                    <h3>Compare traces by selecting result items</h3>
                                </div>
                                <div className="traces-wrapper">
                                    {traces.filter(trace => {
                                        const parentSpan = trace.spans.find(span => span.type === 'parent');
                                        return parentSpan.operationName !== 'GET /metrics';
                                    }).map(trace => {
                                        const parentSpan = trace.spans.find(span => span.type === 'parent');
                                        const timeTaken = calculateTimeTaken(trace.spans);
                                        const isExpanded = expandedTraceID === trace.traceID;
                                        return (
                                            <div key={trace.traceID} className='trace'>
                                                <Link to="/traces" className='header-traces'>
                                                    <div className='box'></div>
                                                    <div className='inner-header'>
                                                        <div className='inner-header-wrapper'>
                                                            <h3>Service:</h3>
                                                            <p>{parentSpan.operationName}</p>
                                                        </div>
                                                        <div className='inner-header-wrapper'>
                                                            <h3>Time Taken:</h3>
                                                            <p>{timeTaken}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className='body-traces'>
                                                    <div className='span-wrapper'>
                                                        <div className='span'>
                                                            <h4>Span:</h4>
                                                            <p>{trace.spans.length}</p>
                                                        </div>
                                                        <div className='services'>
                                                            <h4>Sub-Services:</h4>
                                                            <p>{trace.spans.length}</p>
                                                        </div>
                                                        <div className='services'>
                                                            <h4>Status: </h4>
                                                            <p>200</p>
                                                        </div>
                                                        <div className='services'>
                                                            <h4>Availabability %: </h4>
                                                            <p>100%</p>
                                                        </div>
                                                        <div className='services'>
                                                            <h4>Error %: </h4>
                                                            <p>0%</p>
                                                        </div>
                                                        <div className='services'>
                                                            <h4>Latency (ms): </h4>
                                                            <p>0.8 </p>
                                                        </div>

                                                    </div>
                                                    <div className='more-details' onClick={() => toggleExpand(trace.traceID)}>
                                                        <img src={drop} alt="Frame" className={isExpanded ? 'rotate' : ''} />
                                                    </div>
                                                </div>
                                                {isExpanded && (
                                                    <div className='expanded-details'>
                                                        {trace.spans.map((span, index) => (
                                                            <div key={span.spanID} className='span-detail'>
                                                                <div className='span2'>
                                                                    <h4>Service {index + 1}:</h4> <p>{span.operationName}</p>
                                                                </div>
                                                                <div className='span2'>
                                                                    <h4>Time Taken: </h4> <p>{(span.duration / 1000).toFixed(2)}ms</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                    {error && <div className="error">{error}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Chat />
            </div>
        </div>
    );
}

export default Dashboard;
