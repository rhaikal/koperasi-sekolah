import PrimaryButton from "@/Components/Button/PrimaryButton"
import Table from "@/Components/Card/Table/Table"
import Invoice from "@/Components/Invoice/Invoice"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react"
import { BsBack, BsWallet2 } from "react-icons/bs"
import { FaBoxOpen } from "react-icons/fa"
import { handlePickup } from "../Partials/Payments/Paid"
import { handlePayment } from "../Partials/Payments/Unpaid"

const Detail = ({ order }) => {
    return (
        <div className="my-4">
            <PrimaryButton className="align-top mr-3"><Link className="flex" href={route('order.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
            {order.status == '1' && order.invoice.method == 'cash' && <PrimaryButton className="flex mr-3" onClick={(e) => handlePayment(e, order)}><BsWallet2 className="mr-2" /> Paid</PrimaryButton>}
            {order.status == '2' && <PrimaryButton className="flex mr-3" onClick={(e) => handlePickup(e, order)}><FaBoxOpen className="mr-2" /> Take</PrimaryButton>}
            <div className="w-full rounded-lg shadow-lg my-6 px-6 py-2 bg-white">
                <Invoice order={order} />
            </div>
        </div>
    )
}

Detail.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default Detail
