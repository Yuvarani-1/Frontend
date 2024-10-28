// src/components/ActivityDetails.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchActivityLogById, selectActivityLog } from '../../features/activityLogsSlice';

const ActivityDetails = () => {
    const { id } = useParams(); // Get the ID from the URL
    const dispatch = useDispatch();
    const activityLog = useSelector(selectActivityLog);
    
    useEffect(() => {
        dispatch(fetchActivityLogById(id)); // Fetch activity log by ID
    }, [dispatch, id]);

    if (!activityLog) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Activity Log Details</h1>
            <p><strong>User ID:</strong> {activityLog.userId}</p>
            <p><strong>Activity Type:</strong> {activityLog.activityType}</p>
            <p><strong>Details:</strong> {activityLog.details}</p>
            <p><strong>Timestamp:</strong> {new Date(activityLog.timestamp).toLocaleString()}</p>
            {activityLog.additionalData && (
                <div>
                    <h2>Additional Data</h2>
                    <pre>{JSON.stringify(activityLog.additionalData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ActivityDetails;
