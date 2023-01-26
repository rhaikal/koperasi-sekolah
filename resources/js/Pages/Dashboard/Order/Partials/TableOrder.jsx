import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import { currencyFormat } from "@/helper";
import { SlOptionsVertical } from "react-icons/sl"

export default function TableOrder ({detailRoute, action, alt, orders}) {
    return (
        <Table>
            <Table.Head>
                <Table.Header>Id</Table.Header>
                <Table.Header>Customer Name</Table.Header>
                <Table.Header>Total Price</Table.Header>
                <Table.Header>Method</Table.Header>
                <Table.Header>Status</Table.Header>
                <Table.Header></Table.Header>
            </Table.Head>
            <Table.Body>
                {!_.isEmpty(orders.data) ? orders.data.map((order) => (
                    <Table.Row key={order.id}>
                        <Table.Content type="header">{order.id}</Table.Content>
                        <Table.Content>{order.user.name}</Table.Content>
                        <Table.Content>{currencyFormat(order.total_price)}</Table.Content>
                        <Table.Content>{_.startCase(order.invoice.method)}</Table.Content>
                        <Table.Content>
                            {{
                                '1': 'Not Paid',
                                '2': 'Paid',
                                '3': 'Picked',
                                '-': 'Expired'
                            }[order.status]}
                        </Table.Content>
                        <Table.Content>
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                </Dropdown.Trigger>
                                <Dropdown.Content>
                                    <Dropdown.Link href={route(detailRoute, order.invoice)}>Detail</Dropdown.Link>
                                    {({
                                        '1': order.invoice.method === 'cash' && order.status == '1',
                                        '2': order.status == '2',
                                    }[action.condition]) &&
                                    <Dropdown.Link onClick={(e) => action.handle(e, order)}>{action.name}</Dropdown.Link>}
                                </Dropdown.Content>
                            </Dropdown>
                        </Table.Content>
                    </Table.Row>
                )):
                    <Table.Row>
                        <Table.Content type="header" colSpan={"6"} className="text-center text-base text-gray-500 font-semibold italic">{alt}</Table.Content>
                    </Table.Row>
                }
            </Table.Body>
        </Table>
    )
}
