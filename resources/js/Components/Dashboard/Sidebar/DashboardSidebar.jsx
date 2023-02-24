import React from "react";
import SideLink from "./Subcomponents/SideLink";
import SideDropdown from "./Subcomponents/SideDropdown";
import { Link } from '@inertiajs/inertia-react';
import { FaHome, FaUserFriends } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { GiTwoCoins } from "react-icons/gi";
import { BsArchiveFill, BsReceipt } from "react-icons/bs";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Sidebar({ auth }) {
    return (
        <aside className="z-20 hidden w-64 overflow-y-auto bg-white bg-indigo-800/90 shadow-xl shadow-indigo-500 dark:bg-gray-200 md:block flex-shrink-0">
            <div className="py-4">
                <Link href={route("dashboard")}>
                    <ApplicationLogo className={"justify-center text-gray-100 dark:text-indigo-800/90"} />
                </Link>
                <ul className="mt-6">
                    <SideLink href={route('dashboard')} active={route().current('dashboard')}><FaHome className="w-5 h-5 mr-4 text-current"/> Dashboard</SideLink>
                    {auth.user.role != '2' && <>
                        <SideLink href={route('users.index')} active={route().current('users.*')}><FaUserFriends className="w-5 h-5 mr-4 text-current"/> User</SideLink>
                    </>}
                    <SideLink href={route('loans.index')} active={route().current('loans.*')}><GiTwoCoins className="w-5 h-5 mr-4 text-current"/> Pinjaman</SideLink>
                    <SideDropdown active={(route().current('order.*'))}>
                        <SideDropdown.Button><BsReceipt className="w-5 h-5 mr-4 text-current" /> Pesanan</SideDropdown.Button>
                        <SideDropdown.Panel>
                            <SideDropdown.Link href={route('order.index')} current={route().current('order.index', {filter: undefined})}>Semua</SideDropdown.Link>
                            <SideDropdown.Link href={route('order.index', {filter: 'unpaid'})} current={route().current('order.index', {filter: 'unpaid'})}>Belum Dibayar</SideDropdown.Link>
                            <SideDropdown.Link href={route('order.index', {filter: 'paid'})} current={route().current('order.index', {filter: 'paid'})}>Sudah Dibayar</SideDropdown.Link>
                            <SideDropdown.Link href={route('order.index', {filter: 'done'})} current={route().current('order.index', {filter: 'done'})}>Selesai</SideDropdown.Link>
                            <SideDropdown.Link href={route('order.index', {filter: 'expired'})} current={route().current('order.index', {filter: 'expired'})}>Kadaluwarsa</SideDropdown.Link>
                        </SideDropdown.Panel>
                    </SideDropdown>
                    {auth.user.role != '2' && <>
                        <SideLink href={route('categories.index')} active={route().current('categories.index')}><BiCategoryAlt className="w-5 h-5 mr-4 text-current"/> Category</SideLink>
                        <SideLink href={route('products.index')} active={route().current('products.*')}><BsArchiveFill className="w-5 h-5 mr-4 text-current"/> Product</SideLink>
                    </>}
                </ul>
            </div>
        </aside>
    )
}
