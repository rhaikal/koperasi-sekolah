import { usePage } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import DashboardNavbar from "../Components/Dashboard/DashboardNavbar";
import DashboardSidebar from "../Components/Dashboard/Sidebar/DashboardSidebar";
import Swal from "sweetalert2/dist/sweetalert2.all";

export default function Dashboard({children, header}) {
    const { flash, auth } = usePage().props

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

    useEffect(() => {
        const main = document.getElementsByTagName('main')
        main[0].scrollTop = 0
    }, [header])


    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar auth={auth} />
            <div className="flex flex-col flex-1 w-full">
                <DashboardNavbar user={auth.user} />
                <main className="h-full overflow-y-auto">
                    <div className="container sm:px-6 pb-5 mx-auto grid scale-100">
                        { header && <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{header}</h2>}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
