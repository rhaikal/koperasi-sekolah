import React from "react";
import Dropdown from "../Dropdown/Dropdown";
import { BiExit } from "react-icons/bi";

export default function Navbar({user}) {
    return (
        <header className="z-10 py-4 bg-white shadow-md dark:bg-gray-800 scale-100">
            <div className="container flex items-center justify-end h-full px-6 mx-auto">
                <ul className="flex items-center flex-shrink-0 space-x-6">
                    <li className="relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="flex items-center align-middle rounded-full focus:shadow-outline-purple focus:outline-none">
                                    <p className="font-bold text-blue-800/75 dark:text-indigo-200 mr-4">{ user.name }</p>
                                    <img
                                        className="object-cover w-8 h-8 rounded"
                                        src={user.profile ? "/storage/"+user.profile : "/storage/img/users/placeholder.png" }
                                        alt=""
                                        aria-hidden="true"
                                    />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('home')}>
                                    <BiExit className="mr-2 text-xl text-current self-center"/>
                                    <p className="font-semibold">
                                        Home
                                    </p>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </header>
    )
}
