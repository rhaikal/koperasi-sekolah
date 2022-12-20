import React from "react";

export default function Header({ children }) {
    return (
        <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
            {children}
        </h1>
    )
}
