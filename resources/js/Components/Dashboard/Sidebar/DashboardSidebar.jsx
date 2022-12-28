import React from "react";
import SideLink from "./Subcomponents/SideLink";
import { Link } from '@inertiajs/inertia-react';
import { FaHome, FaSuitcaseRolling } from "react-icons/fa";

export default function Sidebar() {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white bg-indigo-800/90 shadow-xl shadow-indigo-500 dark:bg-gray-200 md:block flex-shrink-0">
            <div className="py-4">
                <Link href={route("dashboard")} className="flex ml-6 text-2xl font-bold text-gray-100 dark:text-indigo-800/90">
                    <FaSuitcaseRolling className="mr-2 text-3xl"/>
                    Kopers
                </Link>
                <ul className="mt-6">
                    <SideLink href={'/'} active={route().current('/')}><FaHome className="w-5 h-5 mr-4 text-current"/> Test</SideLink>
                    <SideLink href={route('dashboard')} active={route().current('dashboard')}><FaHome className="w-5 h-5 mr-4 text-current"/> Dashboard</SideLink>
                </ul>
            </div>
        </aside>
    )
}
