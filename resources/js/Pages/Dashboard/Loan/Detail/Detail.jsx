import Header from "@/Components/Auth/Header"
import PrimaryButton, { primaryButtonClass } from "@/Components/Button/PrimaryButton"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Head, Link } from "@inertiajs/inertia-react"
import Overview from "@/Components/Overview/Overview"
import { BsBack } from "react-icons/bs"
import { currencyFormat, dateFormat } from "@/helper"

const Detail = ({ loan }) => {
    return (
        <>
            <Head title="Pinjaman" />
            <div className="py-8">
                <Link className={primaryButtonClass} href={route('loans.index')}><BsBack className="mr-2" /> Back</Link>
                <div className={`transition-all grid grid-cols-10 py-4 gap-4`}>
                    <div
                        className={`grid rounded shadow-lg p-4 px-4 md:p-8 mb-6 order-last lg:order-first transition-opacity ease-out duration-700 col-span-10 lg:col-span-6`}
                    >
                        <div>
                            <Header className="text-center">Identification</Header>
                            <Overview.Content image={ window.innerWidth > 1024 ? loan.user.profile : null}>
                                <Overview.List header="Name">{loan.user.name}</Overview.List>
                                <Overview.List header="Email">{loan.user.email}</Overview.List>
                                <Overview.List header="Number Phone">{loan.user.no_phone}</Overview.List>
                            </Overview.Content>
                        </div>
                    </div>
                    <div className={`grid h-fit rounded shadow-lg p-4 px-4 md:p-8 mb-6 order-first lg:order-last col-span-10 lg:col-span-4`}>
                        <div>
                            <Header className="text-center">Loan Data</Header>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className={"self-center lg:col-span-3"}>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                        <div className="text-sm font-medium sm:col-span-1 text-gray-500">Ammount</div>
                                        <div className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{currencyFormat(loan.ammount)}</div>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                        <div className="text-sm font-medium sm:col-span-1 text-gray-500">Borrow date</div>
                                        <div className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{dateFormat(loan.created_at)}</div>
                                    </div>
                                    <div className="px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                                        <div className="text-sm font-medium sm:col-span-1 text-gray-500">Term of payment</div>
                                        <div className="mt-1 text-sm text-gray-900 sm:col-span-1 sm:mt-0">{dateFormat(loan.term_of_payment)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Detail.layout = page => <DashboardLayout children={page} />

export default Detail;
