import { Disclosure, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/inertia-react";
import { createContext, useContext } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

const DropdownContext = createContext();

const Dropdown = ({children, active}) => {
    return (
        <Disclosure as="div" className="relative px-6 py-3" defaultOpen={active}>
            {({open}) => (
                <DropdownContext.Provider value={{ open,active }}>
                    {children}
                </DropdownContext.Provider>
            )}
        </Disclosure>
    )
}

const Button = ({children}) => {
    const { open, active } = useContext(DropdownContext);

    return (
        <h3 className="flow-root">
            <Disclosure.Button className={`inline-flex items-center justify-between w-full font-semibold ${(active) ? 'text-white' : 'text-indigo-200'} transition-colors duration-150 hover:text-white dark:hover:text-gray-700`}>
                {active && <span className="transition duration-150 ease-in-out absolute inset-y-0 left-0 w-1 bg-white rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>}
                <span className="text-base flex items-center">{children}</span>
                <span className="ml-6 flex items-center">
                        {open ?
                            <BsFillCaretUpFill /> : <BsFillCaretDownFill />
                        }
                </span>
            </Disclosure.Button>
        </h3>
    )
}

const Panel = ({children}) => {
    return (
        <Transition
            enter="transition duration-300 ease-in-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-in-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
        >
            <Disclosure.Panel className="py-3 mt-2 rounded bg-gray-100">
                <div className="space-y-2">
                    {children}
                </div>
            </Disclosure.Panel>
        </Transition>
    )
}

const DropdownLink = ({children, href, current}) => {
    const { active } = useContext(DropdownContext)

    return (
        <div className="flex items-center">
            <Link
                href={href}
                className={
                    (active && current) ?
                    "ml-3 text-sm font-semibold text-indigo-800" :
                    "ml-3 text-sm text-gray-600 hover:text-indigo-800"
                }
            >
                {children}
            </Link>
        </div>
    )
}

Dropdown.Button = Button
Dropdown.Panel = Panel
Dropdown.Link = DropdownLink

export default Dropdown
