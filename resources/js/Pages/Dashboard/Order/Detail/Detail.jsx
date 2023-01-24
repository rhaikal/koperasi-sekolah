import PrimaryButton from "@/Components/Button/PrimaryButton"
import Table from "@/Components/Card/Table/Table"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { BsBack } from "react-icons/bs"

const Detail = ({ invoice, user }) => {
    return (
        <div className="my-4">
            <PrimaryButton className="flex" onClick={() => {history.back()}}><BsBack className="mr-2" /> Back</PrimaryButton>
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
                            <p className="text-gray-600 text-sm">Date : {new Date(invoice.order.created_at).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">Due Date : {new Date(invoice.due_date).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">Payment Method : {invoice.method}</p>
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
                            {invoice.order.products.map((product) => {
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
                                <Table.Content>{currencyFormat(invoice.order.total_price)}</Table.Content>
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
