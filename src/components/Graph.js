import React from 'react';
import { Line } from 'react-chartjs-2';

const Graph = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Sales',
                data: [12, 19, 3, 5, 2],
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
        ],
    };

    return (
        <div>
            <h3>Sales Data</h3>
            <Line data={data} />
        </div>
    );
};

export default Graph;
