import React from "react";
import SideLink from "./Subcomponents/SideLink";
import SideDropdown from "./Subcomponents/SideDropdown";
import { Link } from '@inertiajs/inertia-react';
import { FaHome, FaSuitcaseRolling } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { BsArchiveFill, BsReceipt } from "react-icons/bs";
import { GiNotebook } from 'react-icons/gi';
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Sidebar() {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white bg-indigo-800/90 shadow-xl shadow-indigo-500 dark:bg-gray-200 md:block flex-shrink-0">
            <div className="py-4">
                <Link href={route("dashboard")}>
                    <ApplicationLogo className={"justify-center text-gray-100 dark:text-indigo-800/90"} />
                </Link>
                <ul className="mt-6">
                    <SideLink href={route('dashboard')} active={route().current('dashboard')}><FaHome className="w-5 h-5 mr-4 text-current"/> Dashboard</SideLink>
                    <SideDropdown active={route().current('order.unpaid.*')}>
                        <SideDropdown.Button><BsReceipt className="w-5 h-5 mr-4 text-current" /> Order</SideDropdown.Button>
                        <SideDropdown.Panel>
                            <SideDropdown.Link href={route('order.unpaid.index')}>Unpaid</SideDropdown.Link>
                        </SideDropdown.Panel>
                    </SideDropdown>
                    <SideLink href={route('categories.index')} active={route().current('categories.index')}><BiCategoryAlt className="w-5 h-5 mr-4 text-current"/> Category</SideLink>
                    <SideLink href={route('products.index')} active={route().current('products.*')}><BsArchiveFill className="w-5 h-5 mr-4 text-current"/> Product</SideLink>
                </ul>
            </div>
        </aside>
    )
}
