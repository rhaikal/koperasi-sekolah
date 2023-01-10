import React from 'react';
import HomeLayout from '@/Layouts/HomeLayout';
import { Head } from '@inertiajs/inertia-react';

export default function Home(props) {
    return (
        <HomeLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>}
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Home page</div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
