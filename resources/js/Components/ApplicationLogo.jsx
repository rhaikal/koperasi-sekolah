import React from 'react';
import { FaSuitcaseRolling } from 'react-icons/fa';

export default function ApplicationLogo({ className }) {
    return (
        <div className={'flex text-2xl font-bold items-center ' + className}>
            <FaSuitcaseRolling className="mr-2 text-3xl"/>
            Kopers
        </div>
    );
}
