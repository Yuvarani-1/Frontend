// EventForm.jsx
import React, { useState, useEffect } from 'react';

const EventForm = ({ onSubmit, onClose, selectedDate }) => {
    console.log('Rendering EventForm');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(selectedDate); // Initialize date with selectedDate prop

    // Update the date when selectedDate changes
    useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, date }); // Pass title and date to onSubmit
        setTitle(''); // Clear input field
        setDate(selectedDate); // Reset date to selected date
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Add Event</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Event Title:
                        <input 
                            type="text" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </label>
                    <label>
                        Event Date:
                        <input 
                            type="date" 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            required 
                        />
                    </label>
                    <button type="submit">Add Event</button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
