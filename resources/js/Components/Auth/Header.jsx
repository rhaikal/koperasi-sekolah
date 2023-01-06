import React from "react";

export default function Header({ children, className }) {
    return (
        <h1 className={"mb-4 text-xl font-bold text-gray-700 dark:text-gray-200 " + className}>
            {children}
        </h1>
    )
}
