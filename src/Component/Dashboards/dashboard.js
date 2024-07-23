import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "../Common-Componet/common.css";
import "../User/user.css";
import "../Dashboards/dashboard.css";
import Sidebar from "../Common-Componet/Sidebar/sidebar";
import Navbar from "../Common-Componet/Navbar/navbar";
import Chat from "../Chat/chat.js";

function Dashboard() {
  const [requestCountData, setRequestCountData] = useState([]);
  const [activeRequestsData, setActiveRequestsData] = useState([]);
  const [responseDurationMedianData, setResponseDurationMedianData] = useState(
    []
  );
  const [responseDuration95thData, setResponseDuration95thData] = useState([]);
  const [requestRatesData, setRequestRatesData] = useState([]);
  const [errorRatesData, setErrorRatesData] = useState([]);
  const [userSessionsData, setUserSessionsData] = useState([]);
  const [transactionCountsData, setTransactionCountsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Fetching existing metrics
        const responseRequestCount = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=sum(request_count_requests_total) by (endpoint)"
        );
        const responseActiveRequests = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=sum(http_server_active_requests) by (http_method, endpoint)"
        );
        const responseDurationMedian = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=histogram_quantile(0.5, sum(rate(http_server_duration_milliseconds_bucket[5m])) by (le, endpoint))"
        );
        const responseDuration95th = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=histogram_quantile(0.95, sum(rate(http_server_duration_milliseconds_bucket[5m])) by (le, endpoint))"
        );

        // Fetching new metrics
        const responseRequestRates = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=request_rates"
        );
        const responseErrorRates = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=error_rates"
        );
        const responseUserSessions = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=user_sessions"
        );
        const responseTransactionCounts = await axios.get(
          "http://127.0.0.1:9090/api/v1/query?query=transaction_counts"
        );
        // Setting state for existing metrics
        setRequestCountData(responseRequestCount.data.data.result);
        setActiveRequestsData(responseActiveRequests.data.data.result);
        setResponseDurationMedianData(responseDurationMedian.data.data.result);
        setResponseDuration95thData(responseDuration95th.data.data.result);

        // Setting state for new metrics
        setRequestRatesData(responseRequestRates.data.data.result);
        setErrorRatesData(responseErrorRates.data.data.result);
        setUserSessionsData(responseUserSessions.data.data.result);
        setTransactionCountsData(responseTransactionCounts.data.data.result);
      } catch (error) {
        setError("Error fetching metrics: " + error.message);
      }
    };

    fetchMetrics();
  }, []);

  const processData = (data, label) => {
    return {
      labels: data.map(
        (point) =>
          point.metric.endpoint ||
          point.metric.http_method ||
          new Date(parseFloat(point.value[0]) * 1000).toLocaleString()
      ),
      datasets: [
        {
          label: label,
          data: data.map((point) => parseFloat(point.value[1])),
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          tension: 0.1,
        },
      ],
    };
  };

  return (
    <div className="user-container">
      <Navbar />
      <div className="user-wrapper">
        <Sidebar />
        <div className="outside-dashboard-wrapper">
          <div className="user-inner-wrapper">
            <div className="user-header-wrapper">
              <div className="user-header">
                <span>Dashboard</span>
              </div>
              <p>
                Drawing insights from your application to monitor your
                application and suggest effective solutions.
              </p>
            </div>
            <div className="dashboard-wrapper">
              {error && <div className="error">{error}</div>}
              <div className="chart-container">
                <h3>Request Count per Endpoint</h3>
                <Line data={processData(requestCountData, "Request Count")} />
              </div>
              <div className="chart-container">
                <h3>Active Requests per Method per Endpoint</h3>
                <Line
                  data={processData(activeRequestsData, "Active Requests")}
                />
              </div>
            </div>
            <div className="dashboard-wrapper">
              {error && <div className="error">{error}</div>}

              <div className="chart-container">
                <h3>Median Response Duration per Endpoint</h3>
                <Line
                  data={processData(
                    responseDurationMedianData,
                    "Median Response Duration"
                  )}
                />
              </div>
              <div className="chart-container">
                <h3>95th Percentile Response Duration per Endpoint</h3>
                <Line
                  data={processData(
                    responseDuration95thData,
                    "95th Percentile Response Duration"
                  )}
                />
              </div>
            </div>
            <div className="dashboard-wrapper">
              {error && <div className="error">{error}</div>}

              <div className="chart-container">
                <h3>Request Rates</h3>
                <Line data={processData(requestRatesData, "Request Rates")} />
              </div>
              <div className="chart-container">
                <h3>Error Rates</h3>
                <Line data={processData(errorRatesData, "Error Rates")} />
              </div>
            </div>
            <div className="dashboard-wrapper">
              {error && <div className="error">{error}</div>}
              <div className="chart-container">
                <h3>User Sessions</h3>
                <Line data={processData(userSessionsData, "User Sessions")} />
              </div>
              <div className="chart-container">
                <h3>Transaction Counts</h3>
                <Line
                  data={processData(
                    transactionCountsData,
                    "Transaction Counts"
                  )}
                />
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
