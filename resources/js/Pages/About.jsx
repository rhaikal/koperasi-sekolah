import React from 'react';
import HomeLayout from '@/Layouts/HomeLayout';
import { Head } from '@inertiajs/inertia-react';

const About = () => {
    return (
        <div>
            <Head title="About" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">About page</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

About.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">About</h2>} children={page} />

export default About
