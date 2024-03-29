import { Transition } from "@headlessui/react";
import ResponsiveNavLink from "./ResponsiveNavLink";
import React, { useContext } from "react";
import { NavigationContext } from "@/Layouts/HomeLayout";

export default function ResponsiveNavbar() {
    const { auth, showingNavigationDropdown } = useContext(NavigationContext);

    return (
        <Transition
            className={"min-h-screen"}
            show={showingNavigationDropdown}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-500"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0"
        >
            <div className="pt-2 pb-3 space-y-1">
                <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                    Beranda
                </ResponsiveNavLink>
                <ResponsiveNavLink href={route('shop.index')} active={route().current('shop.index')}>
                    Toko
                </ResponsiveNavLink>
            </div>

            { auth.user ?
                <div className="pt-4 pb-1 border-t border-gray-200">
                    <div className="flex px-4">
                        <img className="w-7 h-7 mr-3 self-center rounded" src={auth.user.profile ? '/storage/' + auth.user.profile : '/storage/img/users/placeholder.png'} alt="Default avatar" />
                        <div>
                            <div className="font-medium text-base text-gray-800 flex">
                                {auth.user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{auth.user.username}</div>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        {auth.user.role != '1' && <ResponsiveNavLink href={route('dashboard')}>dashboard</ResponsiveNavLink>}
                        <ResponsiveNavLink href={route('profile.edit')}>Profil</ResponsiveNavLink>
                        <ResponsiveNavLink href={route('history.index')}>Riwayat</ResponsiveNavLink>
                        <ResponsiveNavLink method="post" href={route('logout')} as="button">
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            :
                <div className='pt-4 pb-1 border-t border-gray-200'>
                    <ResponsiveNavLink href={route('login')}>
                        Log In
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('register')}>
                        Register
                    </ResponsiveNavLink>
                </div>
            }
        </Transition>
    )
}
