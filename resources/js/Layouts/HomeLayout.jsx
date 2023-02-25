import React, { createContext, useState } from 'react';
import Navbar from '@/Components/Navbar/Navbar';
import { useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.all';
import { usePage } from '@inertiajs/inertia-react';
import Footer from '@/Components/Footer/Footer';

export const NavigationContext = createContext();

export default function Authenticated({ auth, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const { flash } = usePage().props

    useEffect(() => {
        if(!(_.isEmpty(flash.alert))){
            const Toast = Swal.mixin({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            })

            Toast.fire({
                icon: flash.alert.icon,
                title: flash.alert.message
            })
        }
    }, [flash])

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <NavigationContext.Provider value={{ auth, showingNavigationDropdown, setShowingNavigationDropdown }}>
                <Navbar />
            </NavigationContext.Provider>

            <main className='min-h-[100vh] mt-12 scale-100'>{children}</main>
            <Footer />
        </div>
    );
}
