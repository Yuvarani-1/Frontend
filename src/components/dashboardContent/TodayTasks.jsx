import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import '../../styles/dashboardstyles/TodayTasks.css'; // Import your CSS file for styling

const TodayTasks = ({ tasks }) => {
    const navigate = useNavigate();
    const today = new Date();

    // Format today’s date as "26 Sat 2024"
    const dateString = today.toLocaleDateString('en-US', { 
        day: '2-digit', 
        weekday: 'short', 
        year: 'numeric',
    }).replace(',', ''); // Remove the comma

    // Check if tasks is an array before filtering
    const todayTasks = Array.isArray(tasks) ? tasks.filter(task => {
        const taskDate = new Date(task.date); // Convert task date to Date object
        return taskDate.toDateString() === today.toDateString(); // Compare formatted dates
    }) : [];

    // Navigate to FullCalendar when the date is clicked
    const handleDateClick = () => {
        navigate('/dashboard/full-calendar'); // Navigate to FullCalendar
    };

    return (
        <div className="today-tasks">
            <div className="tasks-box" onClick={handleDateClick} style={{ cursor: 'pointer' }}>
                <div className="date-box">{dateString}</div>
                <ul className="task-list">
                    {todayTasks.length > 0 ? (
                        todayTasks.map((task, index) => (
                            <li key={index} className="task-item">{task.title}</li>
                        ))
                    ) : (
                        <li className="task-item">No tasks for today!</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

// Prop validation
TodayTasks.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired, // Assuming date is stored as a string
        })
    ).isRequired, // Make sure tasks prop is required
};

export default TodayTasks;
