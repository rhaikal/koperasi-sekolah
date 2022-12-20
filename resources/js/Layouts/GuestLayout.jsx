import React from 'react';
import Image from '@/Components/Image';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ children, imgSrc = '', imgDarkSrc = '', imgAlt =''}) {
    return (
        <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div className="flex flex-col overflow-y-auto md:flex-row">
                    <div className="h-32 md:h-auto md:w-1/2">
                        <Image src={imgSrc} alt={imgAlt}></Image>
                        <Image src={imgDarkSrc} alt={imgAlt} darkMode={true}></Image>
                    </div>
                    <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
                        <div className="w-full">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
