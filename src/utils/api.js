import axios from 'axios';

const API_URL = '/api/admin'; // Adjust as needed

export const fetchAnalyticsData = async () => {
    const response = await axios.get(`${API_URL}/analytics`);
    return response.data;
};
