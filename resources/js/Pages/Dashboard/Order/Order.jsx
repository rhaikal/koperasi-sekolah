import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import Pagination from "@/Components/Pagination/Pagination"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { SlOptionsVertical } from "react-icons/sl"
import { handlePickup } from "./Partials/Payments/Paid"
import { handlePayment } from "./Partials/Payments/Unpaid"

const Order = ({ orders }) => {
    return (
        <div className="min-w-0 p-4 pt-8 overflow-x-auto rounded-lg shadow-lg">
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
                                    '3': 'Done',
                                    '-': 'Expired'
                                }[order.status]}
                            </Table.Content>
                            <Table.Content>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('order.show', order)}>Detail</Dropdown.Link>
                                        {order.status == 1 && order.invoice.method == 'cash' && <Dropdown.Link onClick={(e) => handlePayment(e, order)}>Pay</Dropdown.Link>}
                                        {order.status == 2 && <Dropdown.Link onClick={(e) => handlePickup(e, order)}>Take</Dropdown.Link>}
                                    </Dropdown.Content>
                                </Dropdown>
                            </Table.Content>
                        </Table.Row>
                    )):
                        <Table.Row>
                            <Table.Content type="header" colSpan={"6"} className="text-center text-base text-gray-500 font-semibold italic">Order Not Found</Table.Content>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
            {!_.isEmpty(orders.data) && <Pagination links={orders.links} from={orders.from} to={orders.to} total={orders.total} />}
        </div>
    )
}

Order.layout = page => <DashboardLayout children={page} header="Order" />

export default Order
