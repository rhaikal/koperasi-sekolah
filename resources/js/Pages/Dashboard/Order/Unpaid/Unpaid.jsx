import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { SlOptionsVertical } from "react-icons/sl"

const Unpaid = ({ orders }) => {
    return (
        <div className="min-w-0 p-4 overflow-x-auto rounded-lg shadow-lg">
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
                                        <Dropdown.Link href={'#'}>Test</Dropdown.Link>
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
