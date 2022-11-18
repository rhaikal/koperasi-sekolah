import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';

export default function About(props) {
    return (
        <AuthenticatedLayout 
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">About</h2>}
        >
            <Head title='About' />
            <div className='py-12'>
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 text-gray-900">About Page</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}