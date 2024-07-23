import automate from "../Assets/automate.svg";
import right from "../Assets/right.svg";
import React, { useState, useEffect, useRef } from "react";
import send from "../Assets/send.svg";
import star from "../Assets/star.svg";
import "../Common-Componet/common.css";
import "../Prompts/prompts.css";
import cross1 from "../Assets/cross1.svg";
import chat_profile1 from "../Assets/chat_profile1.svg";
import Response from "../Response";
import Frame from "../Assets/Frame.svg";
import san from "../Assets/san.svg";
import click2 from "../Assets/click2.svg";
import Chat from "../Chat/chat";
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import drop3 from "../Assets/drop3.svg";
import ChatBot from "../Assets/chatbot.png";

function Prompts(props) {
  const [messageHistory, setMessageHistory] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatWrapperRef = useRef(null);
  const [value,setValue]=useState("")
  const [content, setContent] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    if (chatWrapperRef.current) {
      chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const responseMapping = {
    "What is the average response time, latency, and error rate of my Application?":
      "The average response time of your application is 10.10 ms. The latency is 5.5 ms. Error rate is 2%.",
    "What are the sub-services used by my Application?":
      "Your application uses sub-services GET /api/get and POST /api/post.",
    "Is my application running properly?":
      "Your application appears to be running properly with 0% risk and error.",
    "average response time":
      "The average response time of your application is 5.10 ms.",
    "response time":
      "The average response time of your application is 5.10 ms.",
    response: "The average response time of your application is 5.10 ms.",
    error: "The error of your application is 0%",
    latency: "The latency of your application is 0.8 ms.",
    "what is status of my application":
      "Your Python application is operating normally with regular garbage collection cycles, stable memory usage, and moderate CPU utilization. The HTTP server component is actively handling requests, primarily with one active GET request on host 10.0.0.28:5000. Overall, your application appears to be functioning as expected with typical resource usage patterns.",
    "How can I decrease my Application response time, latency, and error rate?":
      "To improve application response time, latency, and error rate, optimize your code and database queries, use caching, and simplify network payloads. Enhance infrastructure with load balancing, scaling, and CDNs. Improve front-end performance by using asynchronous loading and optimizing assets. Implement comprehensive error monitoring and graceful handling. Adopt microservices and containerization for scalability. Utilize CI/CD for frequent, reliable updates. Optimize third-party API usage and ensure strong SLAs with providers. This ensures a more reliable and performant application.",
    "What are the steps to restart my Application or Services?":
      "To restart your application or services, first, access the server using SSH or RDP, or log in directly. Check the service status with commands like `systemctl status <service-name>` on Linux or `Get-Service <service-name>` on Windows. Stop the service using `systemctl stop <service-name>` (Linux) or `Stop-Service <service-name>` (Windows), and verify it has stopped. Then, start the service again using `systemctl start <service-name>` or `Start-Service <service-name>`. Confirm the service is running by rechecking its status, and finally, review logs to ensure everything is functioning correctly. For containerized applications, use `docker` or `kubectl` commands for similar operations.",
    "Steps to protect a network from unauthorized access, data breaches.":
      "To protect a network from unauthorized access and data breaches, implement strong access controls with multi-factor authentication and role-based permissions. Use firewalls to control network traffic and web application firewalls for added protection. Regularly update and patch systems to fix vulnerabilities. Encrypt sensitive data in transit and at rest, and employ intrusion detection/prevention systems to monitor for suspicious activity. Conduct regular security audits and training to ensure all users follow best practices. Finally, maintain robust backup solutions to recover data in case of an incident.",
  };

  const handleSelectPrompt = (prompt) => {
    const newMessage = { type: "user", text: prompt };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    if (responseMapping[prompt]) {
      const responseMessage = {
        type: "bot",
        response: responseMapping[prompt],
      };
      setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
    } else {
      const errorMessage = {
        type: "bot",
        response: "Sorry, I don't have a response for that question.",
      };
      setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setShowChat(true);
  };

  const handleSendMessage = () => {
    const message = userMessage.trim();

    if (message) {
      const newMessage = { type: "user", text: message };
      setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      setShowChat(true);

      if (responseMapping[message.toLowerCase()]) {
        const responseMessage = {
          type: "bot",
          response: responseMapping[message.toLowerCase()],
        };
        setChatMessages((prevMessages) => [...prevMessages, responseMessage]);
      } else {
        const errorMessage = {
          type: "bot",
          response: "Sorry, I don't have a response for that question.",
        };
        setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
      }

      setUserMessage("");
    }
  };

  const allContent = {
    "market-analysis": {
      line1:
        "AI streamlines data collection and analysis, allowing researchers to focus on interpreting insights",
      line2:
        "AI streamlines data collection and analysis, allowing researchers to focus on interpreting insights",
      line3: "AI predicts trends based on historical data",
      line4: "AI tailors experiences by analyzing individual behavior",
      line5: "AI identifies distinct customer groups",
      line6: "AI detects emerging patterns in large datasets",
      line7: " Set alerts for portfolio value changes",
      line8: "Explore market trends for your key holdings over the last month",
      line9: "Show me market trends for my top holdings over the last month",
    },
    "portfolio-management": {
      line1:
        "Diversify across different types of cryptocurrencies to spread risk",
      line2: "Monitor the performance of your investments in real-time",
      line3: "Adjust your portfolio based on market conditions",
      line4: "Crypto markets can be volatile",
      line5:
        "Consider using platforms like Uphold, Delta,for portfolio management",
      line6:
        "Involves strategically selecting to optimize returns and minimize risks",
      line7: "AI algorithms detect emerging trends in large datasets",
      line8: "Set an alert for my portfolio value increases by 10%",
      line9:
        " Consider a mix of established coins (like Bitcoin and Ethereum) and promising altcoins",
    },
    "trading-insights": {
      line1: "What is the current value of my cryptocurrency portfolio?",
      line2:
        "AI tools streamline data collection and analysis, freeing up researchers to focus on interpreting insights",
      line3:
        "AI sentiment analysis automates the process of analyzing text data to identify expressed sentiments or emotional tones",
      line4:
        "AI models can predict future trends and behaviors based on historical data",
      line5:
        "AI algorithms analyze individual customer behavior to create personalized experiences",
      line6:
        "AI identifies distinct customer segments based on behavior, demographics, and preferences.",
      line7:
        "AI algorithms detect emerging trends and patterns in large datasets",
      line8: "Set an alert for my portfolio value increases by 10%",
      line9: "Show me market trends for my top holdings over the last month",
    },
    "technical-analysis": {
      line1:
        "If your crypto investments appreciate significantly, consider rebalancing to avoid an overly heavy portfolio",
      line2:
        "To determine your current portfolio value, you need to calculate the total value of your crypto holdings",
      line3:
        "For technical analysis, consider using tools like moving averages, RSI ( MACD  and chart patterns.",
      line4:
        "These indicators can help you identify trends, potential entry/exit points, and overall market sentiment",
      line5:
        "AI algorithms analyze individual customer behavior to create personalized experiences",
      line6:
        "AI identifies distinct customer segments based on behavior, demographics, and preferences.",
      line7:
        "AI algorithms detect emerging trends and patterns in large datasets",
      line8: "Set an alert for my portfolio value increases by 10%",
      line9: "Show me market trends for my top holdings over the last month",
    },
  };
  useEffect(() => {
    // Check if activeCategory is stored in localStorage
    const storedCategory = localStorage.getItem("activeCategory");
    if (storedCategory && allContent[storedCategory]) {
      setActiveCategory(storedCategory);
      setContent({ [storedCategory]: allContent[storedCategory] });
    } else {
      // Default to "all" category on first render
      setActiveCategory("all");
      setContent(allContent);
      localStorage.setItem("activeCategory", "all");
    }
  }, []);

  const handleChangeCategory = (insidecategory) => {
    // Update active category and content based on button click
    setActiveCategory(insidecategory);
    if (insidecategory === "all") {
      setContent(allContent);
    } else {
      setContent({ [insidecategory]: allContent[insidecategory] });
    }
    localStorage.setItem("activeCategory", insidecategory);
  };

  return (
    <div className="user-container">
      <Navbar />
      <div className="user-wrapper">
        <Sidebar />

        <div className="chat-container">
          <div className="chat-container-top">
            <input
              type="text"
              placeholder="Ask a question about your data from AI"
              style={{
                width: "80%",
                height: "40px",
                padding: "5px",
                borderRadius: "5px",
                border: "1px solid gray",
              }}
            />
            <button value={value} onClick={(e)=>e.target.value}>Search</button>
          </div>
          <div className="container-text">
            <button
              onClick={() => handleChangeCategory("all")}
              style={{
                backgroundColor:
                  activeCategory === "all" ? "rgb(240, 245, 255)" : "",
              }}
            >
              All
            </button>
            <button
              onClick={() => handleChangeCategory("market-analysis")}
              style={{
                backgroundColor:
                  activeCategory === "market-analysis"
                    ? "rgb(240, 245, 255)"
                    : "",
              }}
            >
              Market Analysis
            </button>

            <button
              onClick={() => handleChangeCategory("portfolio-management")}
              style={{
                backgroundColor:
                  activeCategory === "portfolio-management"
                    ? "rgb(240, 245, 255)"
                    : "",
              }}
            >
              Portfolio Management
            </button>
            <button
              onClick={() => handleChangeCategory("trading-insights")}
              style={{
                backgroundColor:
                  activeCategory === "trading-insights"
                    ? "rgb(240, 245, 255)"
                    : "",
              }}
            >
              Trading Insights
            </button>
            <button
              onClick={() => handleChangeCategory("technical-analysis")}
              style={{
                backgroundColor:
                  activeCategory === "technical-analysis"
                    ? "rgb(240, 245, 255)"
                    : "",
              }}
            >
              Technical Analysis
            </button>
          </div>
          <h1 style={{ margin: "10px 35px", color: "black", fontSize: "20px" }}>
            All Suggested Questions
          </h1>

          {content && (
            <div>
              {Object.keys(content).map((insidecategory) => (
                <div key={insidecategory} className="chat">
                  <div className="grid-item">
                    {content[insidecategory].line1}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line2}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line3}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line4}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line5}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line6}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line7}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line8}
                  </div>
                  <div className="grid-item">
                    {content[insidecategory].line9}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="show-more-button">
            <button>See More Questions</button>
            <img
              src={drop3}
              alt="drop"
              style={{ marginLeft: "-50px", cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="chat-container-right">
          <div className="user-middle-wrapper">
            <div className="left-middle-wrapper">
              <div className="new-chat-wrapper">
                {/* <div className="new-chat">
                  <a href="/user">
                    <img src={click2} alt="Frame" />
                    <p>New Chat</p>
                  </a>
                </div> */}
              </div>
              <div className="top-middle-header">
                <img src={automate} alt="" />
                <h5>Automated Monitoring Observability and Resolution</h5>
              </div>
              <div className="welcome-header">
                <h2 style={{ color: "black" }}>Welcome!!!</h2>
                <h3 style={{ color: "black" }}>I am here to assist You</h3>
                <h3 style={{ color: "black" }}>Please select any one prompt</h3>
              </div>
              <div className="top-middle-image">
                <img src={ChatBot} alt="" />
              </div>
              {/* {!showChat ? (
                <div className="top-middle-option">
                  <div
                    className="option"
                    onClick={() =>
                      handleSelectPrompt(
                        "What is the average response time, latency, and error rate of my Application?"
                      )
                    }
                  >
                    <p>
                      What is the average response time, latency, and error rate
                      of my Application?
                    </p>
                    <img src={right} alt="" />
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleSelectPrompt(
                        "What are the sub-services used by my Application?"
                      )
                    }
                  >
                    <p>What are the sub-services used by my Application?</p>
                    <img src={right} alt="" />
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleSelectPrompt("Is my application running properly?")
                    }
                  >
                    <p>Is my application running properly?</p>
                    <img src={right} alt="" />
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleSelectPrompt(
                        "How can I decrease my Application response time, latency, and error rate?"
                      )
                    }
                  >
                    <p>
                      How can I decrease my Application response time, latency,
                      and error rate?
                    </p>
                    <img src={right} alt="" />
                  </div>
                  <div
                    className="option"
                    onClick={() =>
                      handleSelectPrompt(
                        "What are the steps to restart my Application or Services?"
                      )
                    }
                  >
                    <p>
                      What are the steps to restart my Application or Services?
                    </p>
                    <img src={right} alt="" />
                  </div>
                </div>
              ) : (
                <div className="chat-wrapper" ref={chatWrapperRef}>
                  <div className="cross-option"></div>
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`chat-component ${message.type}`}
                    >
                      <div className="chat-header">
                        <img
                          src={message.type === "bot" ? Frame : san}
                          alt=""
                        />
                      </div>
                      <div className="chat-body">
                        <p>{message.text}</p>
                        <Response message={message.response} />
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          </div>
          {/* <div className="bottom-right-rightChatbot">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default Prompts;
