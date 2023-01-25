import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import Pagination from "@/Components/Pagination/Pagination"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Inertia } from "@inertiajs/inertia"
import { SlOptionsVertical } from "react-icons/sl"
import Swal from "sweetalert2/dist/sweetalert2.all"

const Paid = ({ orders }) => {
    return (
        <div className="min-w-0 p-4 pt-8 overflow-x-auto rounded-lg shadow-lg">
            <Table>
                <Table.Head>
                    <Table.Header>Id</Table.Header>
                    <Table.Header>Total Price</Table.Header>
                    <Table.Header>Method</Table.Header>
                    <Table.Header></Table.Header>
                </Table.Head>
                <Table.Body>
                    {!_.isEmpty(orders.data) ? orders.data.map((order) => (
                        <Table.Row key={order.id}>
                            <Table.Content type="header">{order.id}</Table.Content>
                            <Table.Content>{currencyFormat(order.total_price)}</Table.Content>
                            <Table.Content>{_.startCase(order.invoice.method)}</Table.Content>
                            <Table.Content>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('order.paid.show', order.invoice)}>Detail</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </Table.Content>
                        </Table.Row>
                    )) :
                        <Table.Row>
                            <Table.Content colSpan={"4"} className="text-center text-base text-gray-500 font-semibold italic">Paid Order Not Found</Table.Content>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
            {!_.isEmpty(orders.data) && <Pagination links={orders.links} from={orders.from} to={orders.to} total={orders.total} />}
        </div>
    )
}

Paid.layout = page => <DashboardLayout children={page} header="Paid Order" />

export default Paid
