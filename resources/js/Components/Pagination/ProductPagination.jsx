import { TbArrowNarrowLeft, TbArrowNarrowRight } from "react-icons/tb";
import { Link } from "@inertiajs/inertia-react";

export default function ProductPagination({links}) {
    let responsivePrevPage;
    let prevPagination;
    if(links?.prev_page_url){
        responsivePrevPage =
            <Link
                preserveState={true}
                href={links.links[0]}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Previous
            </Link>

        prevPagination =
            <Link
                preserveState={true}
                href={links.links[0].url}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
                <span className="sr-only">Previous</span>
                <TbArrowNarrowLeft className="h-5 w-5" aria-hidden="true" />
            </Link>
    } else {
        responsivePrevPage =
            <button
                disabled={true}
                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
            >
                Previous
            </button>

        prevPagination =
            <button
                disabled={true}
                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20"
            >
                <span className="sr-only">Previous</span>
                <TbArrowNarrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
    }

    let responsiveNextPage;
    let nextPagination;
    if(links?.next_page_url){
        responsiveNextPage =
            <Link
                preserveState={true}
                href={links.links[links.links.length - 1]}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                Next
            </Link>

        nextPagination =
            <Link
                preserveState={true}
                href={links.links[links.links.length - 1].url}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
                <span className="sr-only">Next</span>
                <TbArrowNarrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
    } else {
        responsiveNextPage =
            <button
                disabled={true}
                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
            >
                Next
            </button>
        nextPagination =
            <button
                disabled={true}
                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 focus:z-20"
            >
                <span className="sr-only">Next</span>
                <TbArrowNarrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
    }


    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 pt-6 mt-6 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                {responsivePrevPage}
                {responsiveNextPage}
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Menampilkan <span className="font-medium">{links.from}</span> - <span className="font-medium">{links.to}</span> dari{' '}
                        <span className="font-medium">{links.total}</span> hasil
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        {prevPagination}
                        {nextPagination}
                    </nav>
                </div>
            </div>
        </div>
    )
}
