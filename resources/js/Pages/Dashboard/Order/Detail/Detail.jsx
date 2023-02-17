import PrimaryButton, { primaryButtonClass } from "@/Components/Button/PrimaryButton"
import Table from "@/Components/Card/Table/Table"
import Invoice from "@/Components/Invoice/Invoice"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react"
import { BsBack, BsWallet2 } from "react-icons/bs"
import { FaBoxOpen } from "react-icons/fa"
import { handlePickup } from "../Partials/Payments/Paid"
import { handlePayment } from "../Partials/Payments/Unpaid"

const Detail = ({ order, auth }) => {
    console.log(order);
    return (
        <div className="my-4">
            <Link className={primaryButtonClass + ' mr-3'} href={route('order.index')}><BsBack className="mr-2" /> Back</Link>
            {order.status == '1' && order.invoice.method == 'cash' && <PrimaryButton className="flex mr-3" onClick={(e) => handlePayment(e, order)}><BsWallet2 className="mr-2" /> Paid</PrimaryButton>}
            {order.status == '2' && <PrimaryButton className="flex mr-3" onClick={(e) => handlePickup(e, order)}><FaBoxOpen className="mr-2" /> Take</PrimaryButton>}
            {auth.user.role > 2 &&
                <div className="grid gap-6 mt-4 grid-cols-1 md:grid-cols-2">
                    {order?.invoice.payment &&
                        <div className={`${order?.pickup ? 'col-span-1' : 'col-span-2'} w-full rounded-lg shadow-lg py-2 px-4 my-4 bg-white`}>
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                Responsible for payment
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                {order?.invoice.payment.user?.name ?? 'QRIS'}
                            </p>
                        </div>
                    }
                    {order?.pickup &&
                        <div className="col-span-1 w-full rounded-lg shadow-lg py-2 px-4 my-4 bg-white">
                            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                Responsible for pickup
                            </p>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                {order.pickup.user.name}
                            </p>
                        </div>
                    }
                </div>
            }
            <div className="w-full rounded-lg shadow-lg my-3 px-6 py-2 bg-white">
                <Invoice order={order} />
            </div>
        </div>
    )
}

Detail.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default Detail
