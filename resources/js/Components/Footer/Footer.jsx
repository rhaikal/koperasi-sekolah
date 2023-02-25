import { Link } from "@inertiajs/inertia-react";
import ApplicationLogo from "../ApplicationLogo";

export default function Footer(){
    return (
        <footer className="p-4 bg-white rounded-lg shadow md:px-5 md:py-6 dark:bg-gray-900">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link href="/">
                    <ApplicationLogo className="block h-9 w-auto fill-current text-indigo-500" />
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link href={route('privacy-policy')} className="mr-4 hover:underline md:mr-6">Privacy Policy</Link>
                    </li>
                    <li>
                        <Link href="#" className="mr-4 hover:underline md:mr-6 ">Terms & Conditions</Link>
                    </li>
                </ul>
            </div>
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"><Link href="#" className="hover:underline">SMK Negeri 2 Surabaya</Link>. All Rights Reserved.
            </span>
        </footer>
    )
}
