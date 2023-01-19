import React, { createContext, useState } from 'react';
import Navbar from '@/Components/Navbar/Navbar';

export const NavigationContext = createContext();

export default function Authenticated({ auth, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <NavigationContext.Provider value={{ auth, showingNavigationDropdown, setShowingNavigationDropdown }}>
                <Navbar />
            </NavigationContext.Provider>

            <main className='mt-12'>{children}</main>
        </div>
    );
}
