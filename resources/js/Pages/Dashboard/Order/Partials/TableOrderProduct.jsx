import Table from "@/Components/Card/Table/Table"
import { currencyFormat } from "@/helper"

export default function TableOrderProduct({invoice}) {
    return (
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
    )
}
