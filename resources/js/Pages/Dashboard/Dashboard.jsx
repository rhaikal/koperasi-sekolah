import Label from "@/Components/Card/Label/Label";
import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { currencyFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { FaBoxes, FaMoneyCheck, FaReceipt, FaUsers } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

const Dashboard = ({orders, auth, revenue, member, pendingPayments, pendingPickups}) => {
    return (
        <>
            <div className={`grid gap-6 mb-8 md:grid-cols-2 ${auth.user.role == '2' ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}>
                {auth.user.role != '2' && <Label
                    icon={
                        <FaMoneyCheck className="h-5 w-5 text-current"/>
                    }
                    iconClass="text-green-500 bg-green-100"
                    text="Revenue"
                    count={currencyFormat(revenue)}
                />}
                <Label
                    icon={
                        <FaUsers className="w-5 h-5 text-current"/>
                    }
                    iconClass="text-orange-500 bg-orange-100"
                    text="Total member"
                    count={member}
                />
                <Label
                    icon={
                        <FaReceipt className="w-5 h-5 text-current"/>
                    }
                    iconClass="text-blue-500 bg-blue-100"
                    text="Pending payments"
                    count={pendingPayments}
                />
                <Label
                    icon={
                        <FaBoxes className="w-5 h-5 text-current" />
                    }
                    iconClass="text-teal-500 bg-teal-100"
                    text="Pending pickups"
                    count={pendingPickups}
                />
            </div>
            <div className={`grid gap-6 mb-8  ${auth.user.role == '2' ? 'lg:grid-cols-1' : 'lg:grid-cols-2'}`}>
                <div>
                    <h1 className="font-medium text-lg text-stone-600">Recent Orders</h1>
                    <div className="min-w-0 p-4 overflow-x-auto rounded-lg shadow-lg">
                        <Table>
                            <Table.Head>
                                <Table.Header>Id</Table.Header>
                                <Table.Header>Customer Name</Table.Header>
                                <Table.Header>Method</Table.Header>
                                <Table.Header>Status</Table.Header>
                                <Table.Header></Table.Header>
                            </Table.Head>
                            <Table.Body>
                                {!_.isEmpty(orders) ? orders.map((order) => (
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
                    </div>
                </div>
            </div>
        </>
    )
}

Dashboard.layout = page => <DashboardLayout children={page} header="Dashboard"/>

export default Dashboard;
