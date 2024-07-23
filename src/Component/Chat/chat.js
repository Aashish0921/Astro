import automate from "../Assets/automate.svg";
import right from "../Assets/right.svg";
import React, { useState, useEffect, useRef } from 'react';
import send from "../Assets/send.svg";
import star from "../Assets/star.svg";
import "../Common-Componet/common.css";
import "../Chat/chat.css";
import cross1 from "../Assets/cross1.svg";
import chat_profile1 from "../Assets/chat_profile1.svg";
import Response from '../Response';
import Frame from "../Assets/Frame.svg";
import san from "../Assets/san.svg";
import click2 from "../Assets/click2.svg";


function Chat(props) {

    const [messageHistory, setMessageHistory] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [submittedMessage, setSubmittedMessage] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const chatWrapperRef = useRef(null);

    useEffect(() => {
        if (chatWrapperRef.current) {
            chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
        }
    }, [chatMessages]);





    const responseMapping = {
        "What is the average response time, latency, and error rate of my Application?": "The average response time of your application is 10.10 ms. The latency is 5.5 ms. Error rate is 2%.",
        "What are the sub-services used by my Application?": "Your application uses sub-services GET /api/get and POST /api/post.",
        "Is my application running properly?": "Your application appears to be running properly with 0% risk and error.",
        "average response time": "The average response time of your application is 5.10 ms.",
        "response time": "The average response time of your application is 5.10 ms.",
        "response": "The average response time of your application is 5.10 ms.",
        "error": "The error of your application is 0%",
        "latency": "The latency of your application is 0.8 ms.",
        "what is status of my application": "Your Python application is operating normally with regular garbage collection cycles, stable memory usage, and moderate CPU utilization. The HTTP server component is actively handling requests, primarily with one active GET request on host 10.0.0.28:5000. Overall, your application appears to be functioning as expected with typical resource usage patterns.",
        "How can I decrease my Application response time, latency, and error rate?": "To improve application response time, latency, and error rate, optimize your code and database queries, use caching, and simplify network payloads. Enhance infrastructure with load balancing, scaling, and CDNs. Improve front-end performance by using asynchronous loading and optimizing assets. Implement comprehensive error monitoring and graceful handling. Adopt microservices and containerization for scalability. Utilize CI/CD for frequent, reliable updates. Optimize third-party API usage and ensure strong SLAs with providers. This ensures a more reliable and performant application.",
        "What are the steps to restart my Application or Services?": "To restart your application or services, first, access the server using SSH or RDP, or log in directly. Check the service status with commands like `systemctl status <service-name>` on Linux or `Get-Service <service-name>` on Windows. Stop the service using `systemctl stop <service-name>` (Linux) or `Stop-Service <service-name>` (Windows), and verify it has stopped. Then, start the service again using `systemctl start <service-name>` or `Start-Service <service-name>`. Confirm the service is running by rechecking its status, and finally, review logs to ensure everything is functioning correctly. For containerized applications, use `docker` or `kubectl` commands for similar operations.",
        "Steps to protect a network from unauthorized access, data breaches.": "To protect a network from unauthorized access and data breaches, implement strong access controls with multi-factor authentication and role-based permissions. Use firewalls to control network traffic and web application firewalls for added protection. Regularly update and patch systems to fix vulnerabilities. Encrypt sensitive data in transit and at rest, and employ intrusion detection/prevention systems to monitor for suspicious activity. Conduct regular security audits and training to ensure all users follow best practices. Finally, maintain robust backup solutions to recover data in case of an incident.",

    };

    const handleSelectPrompt = (prompt) => {
        const newMessage = { type: "user", text: prompt };
        setChatMessages(prevMessages => [...prevMessages, newMessage]);

        if (responseMapping[prompt]) {
            const responseMessage = { type: "bot", response: responseMapping[prompt] };
            setChatMessages(prevMessages => [...prevMessages, responseMessage]);
        } else {
            const errorMessage = { type: "bot", response: "Sorry, I don't have a response for that question." };
            setChatMessages(prevMessages => [...prevMessages, errorMessage]);
        }

        setShowChat(true);
    };

    const handleSendMessage = () => {
        const message = userMessage.trim();

        if (message) {
            const newMessage = { type: "user", text: message };
            setChatMessages(prevMessages => [...prevMessages, newMessage]);
            setShowChat(true);

            if (responseMapping[message.toLowerCase()]) {
                const responseMessage = { type: "bot", response: responseMapping[message.toLowerCase()] };
                setChatMessages(prevMessages => [...prevMessages, responseMessage]);
            } else {
                const errorMessage = { type: "bot", response: "Sorry, I don't have a response for that question." };
                setChatMessages(prevMessages => [...prevMessages, errorMessage]);
            }

            setUserMessage("");
        }
    };
    

    return (
        <div className="chat-container">
            <div className="user-middle-wrapper">
                <div className="left-middle-wrapper">
                    <div className="new-chat-wrapper">
                        <div className="new-chat">
                            <a href="/user">
                                <img src={click2} alt="Frame" />
                                <p>New Chat</p>
                            </a>
                        </div>
                    </div>
                    <div className="top-middle-header">
                        <img src={automate} alt="" />
                        <h5>Automated Monitoring Observability and Resolution</h5>
                    </div>
                    {!showChat ? (
                        <div className="top-middle-option">
                            <div className="option" onClick={() => handleSelectPrompt("What is the average response time, latency, and error rate of my Application?")}>
                                <p>What is the average response time, latency, and error rate of my Application?</p>
                                <img src={right} alt="" />
                            </div>
                            <div className="option" onClick={() => handleSelectPrompt("What are the sub-services used by my Application?")}>
                                <p>What are the sub-services used by my Application?</p>
                                <img src={right} alt="" />
                            </div>
                            <div className="option" onClick={() => handleSelectPrompt("Is my application running properly?")}>
                                <p>Is my application running properly?</p>
                                <img src={right} alt="" />
                            </div>
                            <div className="option" onClick={() => handleSelectPrompt("How can I decrease my Application response time, latency, and error rate?")}>
                                <p>How can I decrease my Application response time, latency, and error rate?</p>
                                <img src={right} alt="" />
                            </div>
                            <div className="option" onClick={() => handleSelectPrompt("What are the steps to restart my Application or Services?")}>
                                <p>What are the steps to restart my Application or Services?</p>
                                <img src={right} alt="" />
                            </div>
                        </div>
                    ) : (<div className='chat-wrapper' ref={chatWrapperRef}>
                        <div className='cross-option'>
                        </div>
                        {chatMessages.map((message, index) => (
                            <div key={index} className={`chat-component ${message.type}`}>
                                <div className="chat-header">
                                    <img src={message.type === "bot" ? Frame : san} alt="" />
                                </div>
                                <div className="chat-body">
                                    <p>{message.text}</p>
                                    <Response message={message.response} />

                                </div>
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
            <div className="bottom-right-rightChatbot">
                <div className="bottom-chat">
                    <img src={star} alt="" />
                    <input
                        type="text"
                        placeholder="Insert your prompt Here"
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                </div>
                <img src={send} alt="" onClick={handleSendMessage} />
            </div>

        </div>
    );
}
export default Chat;