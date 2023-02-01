import React, { useContext, useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react"
import NavLink from "./NavLink";
import ApplicationLogo from "../ApplicationLogo"
import Dropdown from "../Dropdown/Dropdown";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { NavigationContext } from "@/Layouts/HomeLayout";
import CartButton from "../Button/CartButton";
import CartSlideOver from "@/Components/SlideOver/CartSlideOver";

export default function Navbar() {
    const { auth, showingNavigationDropdown, setShowingNavigationDropdown } = useContext(NavigationContext);
    const [ openCart , setOpenCart ] = useState(false);
    const { cart } = usePage().props;

    return (
        <nav className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>
                    </div>

                    <div className="hidden space-x-8 sm:-my-px sm:flex">
                        <NavLink href={route('home')} active={route().current('home')}>
                            Home
                        </NavLink>
                        <NavLink href={route('about')} active={route().current('about')}>
                            About
                        </NavLink>
                        <NavLink href={route('shop.index')} active={route().current('shop.*')}>
                            Shop
                        </NavLink>
                    </div>

                    <div className="hidden sm:flex sm:items-center">
                        <div className="flex items-center relative">
                            <CartButton count={cart && cart.products.length} className="mr-2" onClick={() => {setOpenCart(true)}} />
                            {auth.user ?
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <img className="w-7 h-7 mr-3 rounded" src={auth.user.profile ? '/storage/' + auth.user.profile : '/storage/img/users/placeholder.png'} alt="Default avatar" />
                                                {auth.user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content containerClasses={"inset-y-4"}>
                                        {auth.user.role != '1' && <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>}
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('history.index')}>History</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            :
                                <div className="px-3 py-2">
                                    <Link href={route('login')} className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none">
                                        Log in
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="ml-4 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        Register
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>

                    <div className="-mr-2 flex items-center sm:hidden">
                        <CartButton count={cart && cart.products.length} className="mr-3" onClick={() => {setOpenCart(true)}}/>
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <ResponsiveNavbar auth={auth} />

            <CartSlideOver cart={cart} open={openCart} setOpen={setOpenCart}  />
        </nav>
    )
}
