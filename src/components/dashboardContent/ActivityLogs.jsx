// src/components/ActivityLogs.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivityLogs, selectActivityLogs, selectActivityLogsStatus, selectActivityLogsError } from '../../features/activityLogsSlice';
import { Link } from 'react-router-dom';

const ActivityLogs = () => {
    const dispatch = useDispatch();
    const logs = useSelector(selectActivityLogs);
    const status = useSelector(selectActivityLogsStatus);
    const error = useSelector(selectActivityLogsError);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchActivityLogs());
        }
    }, [status, dispatch]);

    return (
        <div>
            <h1>Activity Logs</h1>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'failed' && <div>Error: {error}</div>}
            {status === 'succeeded' && (
                <ul>
                {logs.map(log => (
                  <li key={log._id}>
                    <Link to={`/activity-logs/${log._id}`}>
                      <p><strong>User ID:</strong> {log.userId}</p>
                      <p><strong>Activity Type:</strong> {log.activityType}</p>
                      <p><strong>Details:</strong> {log.details}</p>
                      <p><strong>Timestamp:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
        </div>
    );
};

export default ActivityLogs;
