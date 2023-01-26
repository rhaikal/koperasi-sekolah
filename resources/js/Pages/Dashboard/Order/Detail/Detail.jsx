import PrimaryButton from "@/Components/Button/PrimaryButton"
import Table from "@/Components/Card/Table/Table"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react"
import { BsBack, BsWallet2 } from "react-icons/bs"
import { FaBoxOpen } from "react-icons/fa"
// import { handlePayment } from "../Unpaid"

const Detail = ({ order }) => {
    console.log(order);
    return (
        <div className="my-4">
            <PrimaryButton className="align-top mr-3"><Link className="flex" href={route('order.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
            {order.status == '1' && order.invoice.method == 'cash' && <PrimaryButton className="flex mr-3"><BsWallet2 className="mr-2" /> Paid</PrimaryButton>}
            {order.status == '2' && <PrimaryButton className="flex mr-3"><FaBoxOpen className="mr-2" /> Take</PrimaryButton>}
            <div className="w-full rounded-lg shadow-lg px-8 py-6 my-4 bg-white">
                <div className="flex flex-col">
                    <h1 className="text-gray-800 text-2xl font-medium mb-4">Order Detail</h1>
                    <div className="grid grid-cols-6">
                        <div className="col-span-3 lg:col-span-2">
                            <p className="text-gray-600 text-sm">Name : {order.user.name}</p>
                            <p className="text-gray-600 text-sm">Email : {order.user.email}</p>
                            <p className="text-gray-600 text-sm">Number Phone : {order.user.no_phone}</p>
                        </div>
                        <div className="col-span-3 lg:col-span-2">
                            <p className="text-gray-600 text-sm">Date : {new Date(order.invoice.created_at).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">
                                {
                                    order.status == 1 || order.status == '-' ? `Due Date ${new Date(order.invoice.due_date).toLocaleDateString()}`:
                                    order.status == 2 ? `Payment Date ${new Date(order.invoice.payment.payment_date).toLocaleDateString()}` :
                                    `Picked Date ${new Date(order.pickup.picked_at).toLocaleDateString()}`
                                }
                            </p>
                            <p className="text-gray-600 text-sm">Payment Method : {order.invoice.method}</p>
                        </div>
                    </div>
                </div>
                <div className="pt-8">
                    <Table>
                        <Table.Head>
                            <Table.Header>image</Table.Header>
                            <Table.Header>name</Table.Header>
                            <Table.Header>price</Table.Header>
                            <Table.Header>quantity</Table.Header>
                            <Table.Header>subtotal</Table.Header>
                        </Table.Head>
                        <Table.Body>
                            {order.products.map((product) => {
                                return (
                                    <Table.Row key={product.id}>
                                        <Table.Content type="image"><img src={`/storage/${product.image}`} /></Table.Content>
                                        <Table.Content>{product.name}</Table.Content>
                                        <Table.Content>{currencyFormat(product.price)}</Table.Content>
                                        <Table.Content>{product.pivot.quantity}</Table.Content>
                                        <Table.Content className="text-left">{currencyFormat(product.pivot.subtotal_price)}</Table.Content>
                                    </Table.Row>
                                )
                            })}
                            <Table.Row className={"border-t"}>
                                <Table.Content colSpan={4} type="header" className="text-right">Total</Table.Content>
                                <Table.Content>{currencyFormat(order.total_price)}</Table.Content>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </div>
    )
}

Detail.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default Detail
