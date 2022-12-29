import React from "react";
import DashboardNavbar from "../Components/Dashboard/DashboardNavbar";
import DashboardSidebar from "../Components/Dashboard/Sidebar/DashboardSidebar";

export default function Dashboard({children, header, user}) {
    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar />
            <div className="flex flex-col flex-1 w-full">
                <main className="h-full overflow-y-auto">
                    <DashboardNavbar name={user.name} />
                    <div className="container px-6 pb-5 mx-auto grid">
                        <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">{header}</h2>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
