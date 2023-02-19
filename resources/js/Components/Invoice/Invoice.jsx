import { currencyFormat } from "@/helper"
import Table from "../Card/Table/Table"

export default function Invoice({order}){
    return (
        <>
            <div className="border-b border-gray-200 p-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Invoice #{order.shortId}</h1>
            </div>
            <div className="pt-2 sm:pt-4 lg:pt-6 px-4 sm:px-6 lg:px-8 flex flex-col">
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
        </>
    )
}
