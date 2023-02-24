import React from 'react';
import HomeLayout from '@/Layouts/HomeLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import { primaryButtonClass } from '@/Components/Button/PrimaryButton';

const Home = () => {
    return (
        <>
            <Head title="Home" />
            <div className="container px-6 py-16 mx-auto">
                <div className="items-center lg:flex">
                    <div className="w-full lg:w-1/2">
                        <div className="lg:max-w-lg">
                            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Belanja lebih mudah, <br /> hanya di <span className="text-blue-500 ">Kopers</span></h1>

                            <p className="mt-3 text-gray-600 dark:text-gray-400">Menyediakan berbagai macam kebutahan sekolah mulai dari pakaian hingga alat tulis.</p>

                            <Link href={route('shop.index')} className={primaryButtonClass + ' mt-6 bg-blue-500'}>Belanja Sekarang</Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                        <img className="w-full h-full lg:max-w-3xl" src="/img/hero/Catalogue-pana.svg" alt="Catalogue-pana.svg" />
                    </div>
                </div>
            </div>
        </>
    );
}

Home.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>} children={page} />

export default Home
