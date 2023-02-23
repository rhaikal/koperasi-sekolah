import Label from "@/Components/Card/Label/Label";
import Table from "@/Components/Card/Table/Table";
import LineChart from "@/Components/Charts/LineChart";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { currencyFormat, dateFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { FaBoxes, FaCoins, FaMoneyCheck, FaReceipt, FaUsers } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
let revenueData = [];

const Dashboard = ({orders, products, auth, revenue, revenueChart, loans, pendingPayments, pendingPickups}) => {
    useEffect(() => {
        for(let i = 0; i <= (new Date()).getMonth(); i++){
            revenueData[i] = 0;
        }

        revenueChart.map((data) => {
            revenueData[data.month - 1] = data.revenue
        })
    })

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
                        <FaCoins className="w-5 h-5 text-current"/>
                    }
                    iconClass="text-orange-500 bg-orange-100"
                    text="Total loans"
                    count={loans.total}
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
            <div className={`grid gap-6 mb-8  ${auth.user.role == '2' ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
                <div className={`${auth.user.role == '2' ? 'col-span-1' : 'col-span-3'} scale-100`}>
                    <h1 className="font-medium text-lg text-stone-600">Recent Loans</h1>
                    <div className="min-w-0 mt-4 overflow-x-auto rounded-lg shadow-lg">
                        <Table>
                            <Table.Head>
                                <Table.Header>Id</Table.Header>
                                <Table.Header>Borrower name</Table.Header>
                                <Table.Header>Ammount</Table.Header>
                                <Table.Header>Borrow date</Table.Header>
                                <Table.Header></Table.Header>
                            </Table.Head>
                            <Table.Body>
                                {!_.isEmpty(loans?.data) ? loans.data.map((loan) => (
                                    <Table.Row key={loan.id}>
                                        <Table.Content type="header">{loan.id}</Table.Content>
                                        <Table.Content>{loan.user.name}</Table.Content>
                                        <Table.Content>{currencyFormat(loan.ammount)}</Table.Content>
                                        <Table.Content>{dateFormat(loan.created_at)}</Table.Content>
                                        <Table.Content>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <Dropdown.Link href={route('loans.show', loan)}>Detail</Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </Table.Content>
                                    </Table.Row>
                                )):
                                    <Table.Row>
                                        <Table.Content type="header" colSpan={"4"} className="text-center text-base text-gray-500 font-semibold italic">Loan Not Found</Table.Content>
                                    </Table.Row>
                                }
                            </Table.Body>
                        </Table>
                    </div>
                </div>
                <div className={`${auth.user.role == '2' ? 'col-span-1' : 'col-span-2'} scale-100`}>
                    <h1 className="font-medium text-lg text-stone-600">Recent Orders</h1>
                    <div className="min-w-0 mt-4 overflow-x-auto rounded-lg shadow-lg">
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
                                        <Table.Content type="header">{order.shortId}</Table.Content>
                                        <Table.Content>{order.user.name}</Table.Content>
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
                { auth.user.role != '2' &&
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex justify-between items-center">
                            <h1 className="font-medium text-lg text-stone-600">Stock Condition</h1>
                            <Link href={route('products.index')} className="text-[10px] text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 px-2 p-1 font-semibold rounded">SEE ALL</Link>
                        </div>
                        <div className="min-w-0 mt-4 overflow-x-auto rounded-lg shadow-lg">
                            <Table>
                                <Table.Head>
                                    <Table.Header>Name</Table.Header>
                                    <Table.Header>Stock</Table.Header>
                                </Table.Head>
                                <Table.Body>
                                    {!_.isEmpty(products) ? products.map((product) => (
                                        <Table.Row key={product.id}>
                                            <Table.Content>{product.name}</Table.Content>
                                            <Table.Content className={(product.stock < 10 ? 'text-rose-600' : (product.stock < 20 ? 'text-amber-500' : "text-green-600"))}>{product.stock}</Table.Content>
                                        </Table.Row>
                                    )):
                                        <Table.Row>
                                            <Table.Content type="header" colSpan={"6"} className="text-center text-base text-gray-500 font-semibold italic">Products Not Found</Table.Content>
                                        </Table.Row>
                                    }
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
                }
            </div>
            { auth.user.role != '2' &&
                <div className={`grid gap-6 mb-8 grid-cols-1`}>
                    <div>
                        <h1 className="font-medium text-lg text-stone-600">Revenue Graphic</h1>
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mt-6 shadow-lg rounded">
                            <div className="p-4 flex-auto">
                                {/* Chart */}
                                <LineChart labels={labels} label={"revenue"} data={revenueData} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

Dashboard.layout = page => <DashboardLayout children={page} header="Dashboard"/>

export default Dashboard;
