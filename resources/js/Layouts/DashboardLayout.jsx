import { usePage } from "@inertiajs/inertia-react";
import React from "react";
import DashboardNavbar from "../Components/Dashboard/DashboardNavbar";
import DashboardSidebar from "../Components/Dashboard/Sidebar/DashboardSidebar";
import Swal from "sweetalert2/dist/sweetalert2.all";

export default function Dashboard({children, header}) {
    const { flash, auth } = usePage().props

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

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar />
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full overflow-y-auto">
                    <DashboardNavbar name={auth.user.name} />
                    <div className="container px-6 pb-5 mx-auto grid">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{header}</h2>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
