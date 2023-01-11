import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import { Fragment } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io"

export default function ProductFilter({subCategories, mobileFiltersOpen, setMobileFiltersOpen}) {
    return (
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                        <div className="flex items-center justify-between px-4 py-2">
                            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                            <button
                            type="button"
                            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                            onClick={() => setMobileFiltersOpen(false)}
                            >
                            <span className="sr-only">Close menu</span>
                            <IoMdClose className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Filters */}
                        <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                            {({ open }) => (
                            <>
                                <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                    <span className="font-semibold text-gray-900">Categories</span>
                                    <span className="ml-6 flex items-center text-gray-300">
                                    {open ? (
                                        <FaMinus aria-hidden="true" />
                                    ) : (
                                        <FaPlus aria-hidden="true" />
                                    )}
                                    </span>
                                </Disclosure.Button>
                                </h3>
                                <Transition
                                    enter="transition duration-500 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-500 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel className="pt-6">
                                    <div className="space-y-6">
                                        {subCategories.map((subCategories) => (
                                        <div key={subCategories.id} className="flex items-center">
                                            <Link
                                                href="#"
                                                className="ml-3 min-w-0 flex-1 text-gray-500"
                                            >
                                                {subCategories.name}
                                            </Link>
                                        </div>
                                        ))}
                                    </div>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                            )}
                        </Disclosure>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
