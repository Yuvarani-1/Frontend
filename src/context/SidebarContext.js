// SidebarContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Sidebar Context
const SidebarContext = createContext();

// Create a provider component
export const SidebarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true); // Default state for sidebar

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

// Custom hook to use the Sidebar context
export const useSidebar = () => {
    return useContext(SidebarContext);
};
