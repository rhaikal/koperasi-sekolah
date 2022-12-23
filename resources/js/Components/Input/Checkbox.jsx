import React from 'react';

export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="border-gray-300 shadow-sm focus:ring-indigo-500 rounded text-indigo-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            onChange={(e) => handleChange(e)}
        />
    );
}
