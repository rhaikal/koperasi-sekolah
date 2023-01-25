import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Inertia } from "@inertiajs/inertia"
import { SlOptionsVertical } from "react-icons/sl"
import Swal from "sweetalert2/dist/sweetalert2.all"

const Unpaid = ({ orders }) => {
    const handlePayment = (e, order) => {
        e.preventDefault();

        Swal.fire({
            title: 'Has this order been paid',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'No',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.post(route('payment.store.cash', order))
            }
        })
    }

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
                    {orders.data ? orders.data.map((order) => (
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
                                        <Dropdown.Link href={route('invoice.show', order.invoice)}>Detail</Dropdown.Link>
                                        {order.invoice.method == 'cash' && <Dropdown.Link onClick={(e) => handlePayment(e, order)}>Pay</Dropdown.Link>}
                                    </Dropdown.Content>
                                </Dropdown>
                            </Table.Content>
                        </Table.Row>
                    )) :
                        <Table.Row>
                            <Table.Content colSpan={"4"}>No Unpaid Order Found</Table.Content>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

Unpaid.layout = page => <DashboardLayout children={page} header="Unpaid Order" />

export default Unpaid
