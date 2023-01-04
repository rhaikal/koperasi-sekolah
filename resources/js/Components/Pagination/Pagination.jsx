import { Link } from "@inertiajs/inertia-react";
import React from "react";
import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";

export default function Pagination({links, from, to, total }) {
    const className = "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ";
    const disableClassName = "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 cursor-default "

    let prevButton
    if(!links[1].active) {
        prevButton = <Link className={className + "rounded-l" } as="button" type="button" href={links[0].url}><TbArrowNarrowLeft className="mr-2 text-xl" /> Prev</Link>
    } else {
        prevButton = <button disabled className={disableClassName + "rounded-l"}><TbArrowNarrowLeft className="mr-2 text-xl" /> Prev</button>
    }

    let nextButton;
    if(!links[links.length - 2].active) {
        nextButton = <Link className={className + "rounded-r" } as="button" type="button" href={links[links.length - 1].url}>Next <TbArrowNarrowRight className="ml-2 text-xl" /></Link>
    } else {
        nextButton = <button disabled className={disableClassName + "rounded-r"}>Next <TbArrowNarrowRight className="ml-2 text-xl" /></button>
    }

    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{from}</span> to <span className="font-semibold text-gray-900 dark:text-white">{to}</span> of <span className="font-semibold text-gray-900 dark:text-white">{total}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0">
                {prevButton}
                {nextButton}
            </div>
        </div>
    )
}
