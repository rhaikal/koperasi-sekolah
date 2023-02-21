import Header from '@/Components/Auth/Header';
import { primaryButtonClass } from '@/Components/Button/PrimaryButton';
import Invoice from '@/Components/Invoice/Invoice';
import HomeLayout from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/inertia-react';
import { BsBack } from 'react-icons/bs';
import { TbFileExport } from 'react-icons/tb';

const DetailHistory = ({order}) => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <Link className={primaryButtonClass + ' mr-3'} href={route('history.index')}><BsBack className="mr-2 h-4" /> Back</Link>
                {order.status > 0 && order.status < 3 &&
                    <>
                        {order.status > 1 && <a className={primaryButtonClass} href={route('exported.order', order)}><TbFileExport className="mr-2 w-4 h-4" /> Export</a>}
                        <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg p-3 mt-6">
                            <Header className={"text-center italic"}>*Note</Header>
                            {{
                                1: <p className="text-gray-800 text-center dark:text-gray-100">Order has been successfully checkout, then make sure to pay with the nominal listed below {order.invoice.method == 'cash' && (<>in <b>school cooperative</b></>)}</p>,
                                2: <p className="text-gray-800 text-center dark:text-gray-100">Order has been successfully paid, then make sure to pickup the product you have purchase in <b>school cooperative</b></p>,
                            }[order.status]}
                        </div>
                    </>
                }
                <div className="bg-white overflow-x-auto shadow-sm sm:rounded-lg my-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Invoice order={order} />
                    </div>
                </div>
            </div>
        </div>
    )
}

DetailHistory.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} children={page} />

export default DetailHistory
