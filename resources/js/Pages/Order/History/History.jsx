import Table from '@/Components/Card/Table/Table';
import Dropdown from '@/Components/Dropdown/Dropdown';
import Pagination from '@/Components/Pagination/Pagination';
import { currencyFormat } from '@/helper';
import HomeLayout from '@/Layouts/HomeLayout';
import { SlOptionsVertical } from 'react-icons/sl';

const History = ({orders}) => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-x-scroll shadow-sm sm:rounded-lg">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200 p-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">History</h1>
                        </div>

                        <section className='py-4 sm:py-6 lg:py-8'>
                            <Table>
                                <Table.Head>
                                    <Table.Header>Id</Table.Header>
                                    <Table.Header>Date</Table.Header>
                                    <Table.Header>Method</Table.Header>
                                    <Table.Header>Status</Table.Header>
                                    <Table.Header>Total Price</Table.Header>
                                    <Table.Header></Table.Header>
                                </Table.Head>
                                <Table.Body>
                                    {(!_.isEmpty(orders.data)) ?
                                        orders.data.map((order) => (
                                            <Table.Row key={order.id}>
                                                <Table.Content type="header" className="w-auto">{order.shortId}</Table.Content>
                                                <Table.Content>{(new Date(order.updated_at)).toLocaleDateString()}</Table.Content>
                                                <Table.Content>{_.startCase(order.invoice.method)}</Table.Content>
                                                <Table.Content>{
                                                    {
                                                        '1': 'Not Paid',
                                                        '2': 'Paid',
                                                        '3': 'Picked',
                                                        '-': 'Expired'
                                                    }[order.status]
                                                }</Table.Content>
                                                <Table.Content>{currencyFormat(order.total_price)}</Table.Content>
                                                <Table.Content>
                                                    <Dropdown>
                                                        <Dropdown.Trigger>
                                                            <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                                        </Dropdown.Trigger>
                                                        <Dropdown.Content>
                                                            <Dropdown.Link href={route('history.show', order)}>Detail</Dropdown.Link>
                                                            {order.status == '1' &&<Dropdown.Link href={route('payment.show', order)}>Pay</Dropdown.Link>}
                                                            {order.status > 1 && <Dropdown.Link href={route('exported.order', order)} onClick={() => {'export'}}>Export</Dropdown.Link>}
                                                        </Dropdown.Content>
                                                    </Dropdown>
                                                </Table.Content>
                                            </Table.Row>
                                        )) :
                                        <Table.Row>
                                            <Table.Content type="header" colSpan={"6"} className="text-center text-base text-gray-500 font-semibold italic">No order has been made</Table.Content>
                                        </Table.Row>
                                    }
                                </Table.Body>
                            </Table>
                            <Pagination links={orders.links} from={orders.from} to={orders.to} total={orders.total}/>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

History.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} children={page} />

export default History
