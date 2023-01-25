import PrimaryButton from "@/Components/Button/PrimaryButton"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react"
import { BsBack} from "react-icons/bs"
import TableOrderProduct from "../../Partials/TableOrderProduct"
const Detail = ({ invoice, user }) => {
    return (
        <div className="my-4">
            <PrimaryButton className="mr-3"><Link className="flex" href={route('order.paid.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
            <div className="w-full rounded-lg shadow-lg px-8 py-6 my-4 bg-white">
                <div className="flex flex-col">
                    <h1 className="text-gray-800 text-2xl font-medium mb-4">Order Detail</h1>
                    <div className="grid grid-cols-6">
                        <div className="col-span-3 lg:col-span-2">
                            <p className="text-gray-600 text-sm">Name : {user.name}</p>
                            <p className="text-gray-600 text-sm">Email : {user.email}</p>
                            <p className="text-gray-600 text-sm">Number Phone : {user.no_phone}</p>
                        </div>
                        <div className="col-span-3 lg:col-span-2">
                            <p className="text-gray-600 text-sm">Date : {new Date(invoice.created_at).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">Payment Date : {new Date(invoice.payment.payment_date).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">Payment Method : {invoice.method}</p>
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    <TableOrderProduct invoice={invoice} />
                </div>
            </div>
        </div>
    )
}

Detail.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default Detail
