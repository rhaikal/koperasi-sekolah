import React, { createContext, useState } from 'react';
import Navbar from '@/Components/Navbar/Navbar';

export const NavigationContext = createContext();

export default function Authenticated({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavigationContext.Provider value={{ auth, showingNavigationDropdown, setShowingNavigationDropdown }}>
                <Navbar />
            </NavigationContext.Provider>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <main>{children}</main>
        </div>
    );
}
