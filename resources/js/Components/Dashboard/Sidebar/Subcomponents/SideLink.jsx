import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function SideLink({ href, active = false, children }) {
    return (
        <li className="relative px-6 py-3">
            { active && <span className="transition duration-150 ease-in-out absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
            <Link
                href={href}
                className={
                    active
                        ? 'ease-in-out inline-flex align-middle items-center w-full text-base text-white transition-colors duration-150 hover:text-white dark:hover:text-gray-500 dark:text-gray-600 font-bold'
                        : 'ease-in-out inline-flex align-middle items-center w-full text-base font-semibold text-indigo-200 transition-colors duration-150 hover:text-white dark:hover:text-gray-700'
                }
            >
                {children}
            </Link>
        </li>
    )
}
