import React, { useState, useContext, Fragment } from 'react';
import { Link } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';

const DropDownContext = React.createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <>{children}</>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children, className }) => {
    const { open, setOpen, toggleOpen } = useContext(DropDownContext);

    return (
        <>
            <div className={className} onClick={toggleOpen}>{children}</div>

            {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ align = 'right', width = '48', containerClasses, contentClasses = 'py-1 bg-white', children }) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top ';

    if (align === 'left') {
        alignmentClasses += 'origin-top-left left-6';
    } else if (align === 'right') {
        alignmentClasses += 'origin-top-right right-6';
    }

    let widthClasses = '';

    if (width === '48') {
        widthClasses = 'w-48';
    }

    return (
        <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <div
                className={`fixed z-50 mt-2 rounded-md shadow-lg h-fit ${alignmentClasses} ${widthClasses} ${containerClasses}`}
                onClick={() => setOpen(false)}
            >
                <div className={`rounded-md ring-1 ring-black ring-opacity-5 ` + contentClasses}>{children}</div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({ onClick, href, method, as, children, data, only }) => {
    const className = "flex w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out cursor-pointer";

    if(onClick){
        return (
            <a href={href} onClick={onClick} className={className}>
                {children}
            </a>
        )
    }

    return (
        <Link
            onClick={onClick}
            href={href}
            method={method}
            as={as}
            className={className}
            data={data}
            only={only}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
