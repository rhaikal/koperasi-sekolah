import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import Pagination from "@/Components/Pagination/Pagination"
import { currencyFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Inertia } from "@inertiajs/inertia"
import { FaAngleDown } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl"
import { handlePickup } from "./Partials/Payments/Paid"
import { handlePayment } from "./Partials/Payments/Unpaid"
import ExportForm from "@/Components/Form/ExportForm"
import { useEffect, useState } from "react"
import { Head } from "@inertiajs/inertia-react"

const statusList = [
    {
        label: 'Belum Dibayar',
        value: 'unpaid'
    },
    {
        label: 'Sudah Dibayar',
        value: 'paid'
    },
    {
        label: 'Selesai',
        value: 'done'
    },
    {
        label: 'Kadaluwarsa',
        value: 'expired'
    },
]

const Order = ({ orders, query, auth }) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [emptyOrders, setEmptyOrders] = useState(false)

    const currentStatus = statusList.find((status) => {
        return status.value == query?.filter
    })

    const handleStartDate = (newValue) => {
        setStartDate(newValue);
        if(startDate == endDate || newValue > endDate) setEndDate(newValue);
    }

    const handleEndDate = (newValue) => {
        setEndDate(newValue);
        if(startDate == endDate && startDate == null || endDate == null) setStartDate(newValue);
    }

    useEffect(() => {
      if(_.isEmpty(orders?.data))
        setEmptyOrders(true);
    }, [])

    const handleSearch = _.debounce((e) => {
        const preserveQuery = {
            filter: query?.filter
        };

        if(e.target.value) Inertia.reload({only:['orders', 'query'], data: {...preserveQuery, search: e.target.value} })
        else Inertia.visit(route('order.index'), {only:['orders', 'query'], data: {...preserveQuery}})
    }, 1000)

    return (
        <>
            <Head title="Pesanan" />
            { auth.user.role != 2 &&
                <ExportForm
                    href={route('exported.orders')}
                    className="mb-2"
                    valueStartDate={startDate}
                    handleStartDate={handleStartDate}
                    valueEndDate={endDate}
                    handleEndDate={handleEndDate}
                    disabled={emptyOrders}
                />
            }
            <div className="min-w-0 p-4 pt-2 overflow-x-auto rounded-lg shadow-lg">
                <div className="scale-100 flex my-4">
                    <Dropdown>
                        <Dropdown.Trigger className="flex"><button className="flex z-10 items-center px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{currentStatus?.label ?? "Status"} <FaAngleDown className="ml-2 w-4 h-4"></FaAngleDown></button></Dropdown.Trigger>
                        <Dropdown.Content align="left">
                            {statusList.map((status) => (
                                <Dropdown.Link key={status.value} href={route('order.index')} data={{ filter: status.value }}>{status.label}</Dropdown.Link>
                            ))}
                        </Dropdown.Content>
                    </Dropdown>
                    <div className="w-96">
                        <input type="search" defaultValue={query?.search ?? null} onChange={handleSearch} id="search-dropdown" className="w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Cari pesanan berdasarkan id atau nama siswa" />
                    </div>
                </div>
                <Table>
                    <Table.Head>
                        <Table.Header>Id</Table.Header>
                        <Table.Header>Nama Siswa</Table.Header>
                        <Table.Header>Total Harga</Table.Header>
                        <Table.Header>Metode</Table.Header>
                        <Table.Header>Status</Table.Header>
                        <Table.Header></Table.Header>
                    </Table.Head>
                    <Table.Body>
                        {!_.isEmpty(orders.data) ? orders.data.map((order) => (
                            <Table.Row key={order.id}>
                                <Table.Content type="header">{order.shortId}</Table.Content>
                                <Table.Content>{order.user.name}</Table.Content>
                                <Table.Content>{currencyFormat(order.total_price)}</Table.Content>
                                <Table.Content>{_.startCase(order.invoice.method)}</Table.Content>
                                <Table.Content>
                                    {{
                                        '1': 'Belum Dibayar',
                                        '2': 'Sudah Dibayar',
                                        '3': 'Selesai',
                                        '-': 'Kadaluwarsa'
                                    }[order.status]}
                                </Table.Content>
                                <Table.Content>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('order.show', order)}>Detail</Dropdown.Link>
                                            {order.status == 1 && order.invoice.method == 'cash' && <Dropdown.Link onClick={(e) => handlePayment(e, order)}>Bayar</Dropdown.Link>}
                                            {order.status == 2 && <Dropdown.Link onClick={(e) => handlePickup(e, order)}>Ambil</Dropdown.Link>}
                                            {order.status > 1 && <Dropdown.Link href={route('exported.order', order)} onClick={() => {'export'}}>Cetak</Dropdown.Link>}
                                        </Dropdown.Content>
                                    </Dropdown>
                                </Table.Content>
                            </Table.Row>
                        )):
                            <Table.Row>
                                <Table.Content type="header" colSpan={"6"} className="text-center text-base text-gray-500 font-semibold italic">Tidak ada pesanan</Table.Content>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>
                {!_.isEmpty(orders.data) && <Pagination links={orders.links} from={orders.from} to={orders.to} total={orders.total} />}
            </div>
        </>
    )
}

Order.layout = page => <DashboardLayout children={page} header="Pesanan" />

export default Order
