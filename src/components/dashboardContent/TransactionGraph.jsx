// components/TransactionGraph.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTxnData, selectTxnData, setTimeRange } from '../../features/txnDataSlice';
import { Bar } from 'react-chartjs-2';
import '../../styles/dashboardstyles/TransactionGraph.css'; // Import the CSS file

const TransactionGraph = () => {
  const dispatch = useDispatch();
  const { data, loading, error, timeRange } = useSelector(selectTxnData);

  useEffect(() => {
    dispatch(fetchTxnData());
  }, [dispatch]);

  const transformData = (data, range) => {
    const transformedData = {};

    data.forEach(item => {
      let dateKey;
      const date = new Date(item.date); // Adjust this based on your date structure

      if (range === 'day') {
        dateKey = date.toLocaleDateString(); // e.g., "10/27/2024"
      } else if (range === 'month') {
        dateKey = `${date.getFullYear()}-${date.getMonth() + 1}`; // e.g., "2024-10"
      } else if (range === 'year') {
        dateKey = date.getFullYear(); // e.g., "2024"
      }

      transformedData[dateKey] = (transformedData[dateKey] || 0) + item.value; // Adjust this based on your value structure
    });

    return {
      labels: Object.keys(transformedData),
      data: Object.values(transformedData),
    };
  };

  const { labels, data: chartData } = transformData(data, timeRange);

  const chartDataConfig = {
    labels: labels,
    datasets: [
      {
        label: 'Transaction Data',
        data: chartData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const handleTimeRangeChange = (event) => {
    dispatch(setTimeRange(event.target.value));
  };

  return (
    <div className="transaction-graph"> {/* Add class for styling */}
      <h2>Transaction Data</h2>
      <select value={timeRange} onChange={handleTimeRangeChange}>
        <option value="day">Day-wise</option>
        <option value="month">Month-wise</option>
        <option value="year">Year-wise</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="chart-container"> {/* Add a container for the chart */}
          <Bar 
            data={chartDataConfig} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Date',
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: 'Values',
                  },
                },
              },
            }} 
          />
        </div>
      )}
    </div>
  );
};

export default TransactionGraph;
