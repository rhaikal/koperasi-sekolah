import PrimaryButton from "@/Components/Button/PrimaryButton"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react"
import { BsBack} from "react-icons/bs"
import { FaBoxOpen } from "react-icons/fa"
import TableOrderDetail from "../../Partials/TableOrderDetail"
import { handlePickup } from "../Paid"
const Detail = ({ invoice }) => {
    return (
        <div className="my-4">
            <PrimaryButton className="mr-3 align-top"><Link className="flex" href={route('order.paid.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
            <PrimaryButton className="flex mr-3" onClick={handlePickup}><FaBoxOpen className="mr-2" /> Take</PrimaryButton>
            <div className="w-full rounded-lg shadow-lg px-8 py-6 my-4 bg-white">
                <div className="flex flex-col">
                    <h1 className="text-gray-800 text-2xl font-medium mb-4">Order Detail</h1>
                    <div className="grid grid-cols-6">
                        <div className="col-span-3 lg:col-span-2">
                            <p className="text-gray-600 text-sm">Name : {invoice.order.user.name}</p>
                            <p className="text-gray-600 text-sm">Email : {invoice.order.user.email}</p>
                            <p className="text-gray-600 text-sm">Number Phone : {invoice.order.user.no_phone}</p>
                        </div>
                        <div className="col-span-3 lg:col-span-2">
                            <p className="text-gray-600 text-sm">Date : {new Date(invoice.created_at).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">Payment Date : {new Date(invoice.payment.payment_date).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">Payment Method : {invoice.method}</p>
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    <TableOrderDetail invoice={invoice} />
                </div>
            </div>
        </div>
    )
}

Detail.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default Detail
