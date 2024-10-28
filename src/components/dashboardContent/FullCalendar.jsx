// FullCalendar.jsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // Import FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid'; 
import EventForm from './EventForm'; // Import the EventForm component
import '../../styles/dashboardstyles/FullCalendar.css'; // Import CSS styles

const CalendarComponent = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [events, setEvents] = useState([
        { title: 'Event 1', date: '2024-10-26' },
        { title: 'Event 2', date: '2024-10-27' }
    ]);
    const [selectedDate, setSelectedDate] = useState(''); // Track the selected date

    // Function to handle adding a new event
    const handleDateClick = (arg) => {
        console.log('Date clicked:', arg.dateStr);
        setSelectedDate(arg.dateStr); // Store the date clicked
        setModalOpen(true); // Open the modal
        console.log('Modal Open:', true);
    };

    // Function to add the event from the form
    const addEvent = ({ title, date }) => {
        const newEvent = { title, date };
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setModalOpen(false); // Close the modal
        console.log('Modal Open:', false);
    };
   
    
    // Function to handle editing or deleting an existing event
    const handleEventClick = (clickInfo) => {
        const { event } = clickInfo;
        const action = prompt('Edit or Delete this event? Type "edit" or "delete":');

        if (action === 'edit') {
            const newTitle = prompt('Enter new title:', event.title);
            if (newTitle) {
                // Update the event's title in state
                setEvents((prevEvents) =>
                    prevEvents.map((e) =>
                        e.date === event.startStr && e.title === event.title
                            ? { ...e, title: newTitle }
                            : e
                    )
                );
                event.setProp('title', newTitle); // Update calendar event title
            }
        } else if (action === 'delete') {
            if (window.confirm('Are you sure you want to delete this event?')) {
                // Filter out the deleted event from state
                setEvents((prevEvents) =>
                    prevEvents.filter((e) => e.date !== event.startStr || e.title !== event.title)
                );
                event.remove(); // Remove the event from the calendar
            }
        }
    };

    return (
        <div className="calendar-container">
            <FullCalendar
                plugins={[dayGridPlugin]} // Use necessary plugins
                initialView="dayGridMonth" // Set initial view
                events={events} // Pass events from state
                dateClick={handleDateClick} // Handle date click for adding events
                eventClick={handleEventClick} // Handle event click for editing/deleting
            />

            {/* Render the EventForm modal */}
            {isModalOpen && (
                <EventForm 
                    onSubmit={addEvent} 
                    onClose={() => setModalOpen(false)} 
                    selectedDate={selectedDate} // Pass selected date to the EventForm
                />
            )}
        </div>
    );
};

export default CalendarComponent;
