import React, { useEffect, useState } from 'react';
import UserVerificationChart from './UserVerificationChart';
import axios from 'axios';

const Charts = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Adjust the URL according to your API
        setUsers(response.data);
      } catch (error) {
        setError('Error fetching user data.');
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Calculate the verification status
  const verifiedCount = users.filter(user => user.isVerified).length;
  const unverifiedCount = users.length - verifiedCount;

  const chartData = {
    labels: ['Verified', 'Unverified'],
    datasets: [
      {
        label: 'User Verification Status',
        data: [verifiedCount, unverifiedCount],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>User Overview</h2>
      <UserVerificationChart data={chartData} />
    </div>
  );
};

export default Charts;
