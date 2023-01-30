import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import { Link } from "@inertiajs/inertia-react";

export default function ProductPagination({links}) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-6 mt-6 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    preserveState={true}
                    href={links.links[0]}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </Link>
                <Link
                    preserveState={true}
                    href={links.links[links.links.length - 1]}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </Link>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{links.from}</span> to <span className="font-medium">{links.to}</span> of{' '}
                        <span className="font-medium">{links.total}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            preserveState={true}
                            href={links.links[0].url}
                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Previous</span>
                            <TbArrowNarrowLeft className="h-5 w-5" aria-hidden="true" />
                        </Link>
                        <Link
                            preserveState={true}
                            href={links.links[links.links.length - 1].url}
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Next</span>
                            <TbArrowNarrowRight className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
