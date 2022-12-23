import React from "react";
import SideLink from "./Subcomponents/SideLink";
import { Link } from '@inertiajs/inertia-react';
import { FaHome, FaSuitcaseRolling } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0">
            <div className="py-4">
                <Link href={route("dashboard")} className="flex ml-6 text-xl font-bold text-indigo-500 dark:text-indigo-200">
                    <FaSuitcaseRolling className="mr-2 text-2xl"/>
                    Kopers
                </Link>
                <ul className="mt-6">
                    <SideLink href={route('dashboard')} active={route().current('dashboard')}><FaHome className="w-5 h-5 mr-4 text-current"/> Dashboard</SideLink>
                </ul>
            </div>
        </aside>
    )
}
