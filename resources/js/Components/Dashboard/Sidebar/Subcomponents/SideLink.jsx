import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function SideLink({ href, active = false, children }) {
    return (
        <li className="relative px-6 py-3">
            { active && <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
            <Link
                href={href}
                className={
                    active
                        ? 'inline-flex align-middle items-center w-full text-base font-semibold  text-blue-400 transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200 dark:text-blue-100 transition duration-150 ease-in-out'
                        : 'inline-flex align-middle items-center w-full text-base font-semibold text-gray-500 transition-colors duration-150 hover:text-blue-800 dark:hover:text-blue-200 transition duration-150 ease-in-out'
                }
            >
                {children}
            </Link>
        </li>
    )
}
