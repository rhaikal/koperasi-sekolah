import PrimaryButton from '@/Components/Button/PrimaryButton';
import { currencyFormat } from '@/helper';
import HomeLayout from '@/Layouts/HomeLayout';
import { handlePayment } from '@/Pages/Dashboard/Order/Partials/Payments/Unpaid';
import { Inertia } from '@inertiajs/inertia';
import { BsCheck } from 'react-icons/bs';
import { FaAngleRight } from 'react-icons/fa';
import OrderSumarry from '../Partials/OrderSummary';

const Payment = ({order}) => {
    const handlePayment = () => {
        window.snap.pay(order.invoice.token, {
            uiMode: 'qr',
            gopayMode: 'qr',
            onSuccess: function(result){
                Inertia.post(route('payment.store.e-wallet'), { notification: result });
            },
            onError: function(result){
                if(result.status_code == 407 && result.transaction_status == 'expired'){
                    Inertia.post(route('payment.store.e-wallet'), { notification: result });
                }
            },
            onClose: function(){
                return;
            }
          })
    }

    return (
        <div className="py-12">
            <div className="max-w-7xl sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Payment</h1>
                        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                            <div className="relative">
                                <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <p className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href={route("shop.index")}>
                                        <BsCheck className='h-5  w-5' />
                                    </p>
                                    <span className="font-semibold text-gray-900">Shop</span>
                                    </li>
                                    <FaAngleRight className='h-4 w-4 text-gray-400' />
                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                        <p className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200 text-xs font-bold text-emerald-700" href="#"><BsCheck className='h-5  w-5' /></p>
                                        <span className="font-semibold text-gray-900">Checkout</span>
                                    </li>
                                    <FaAngleRight className='h-4 w-4 text-gray-400' />
                                    <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                        <p className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2 cursor-default" href="#">3</p>
                                        <span className="font-semibold text-gray-900">Pembayaran</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="grid sm:px-10 lg:grid-cols-5 h-full">
                        <OrderSumarry products={order.products} containerClassnames={"lg:col-span-3"} />
                        <div className="mt-3 bg-gray-50 px-4 pb-4 pt-5 lg:mt-0 lg:col-span-2">
                            <div className="w-full h-fit flex flex-col dark:bg-gray-800 bg-white dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4 text-center">
                                <h1 className="text-gray-800 text-2xl dark:text-gray-100 font-bold mb-3">Berhasil Checkout</h1>
                                <p className="text-gray-800 dark:text-gray-100 text-sm">Pesanan sudah berhasil dicheckout, lalu lakukan pembayaran dengan nominal yang tertera di bawah {order.invoice.method == 'cash' && (<>di <b>koperasi sekolah</b></>)}</p>
                            </div>
                            <div>
                                <div className="p-2 flex items-center justify-between border-y border-gray-500">
                                    <p className="text-base font-medium text-gray-900">Total</p>
                                    <p className="text-lg font-semibold text-gray-900">{currencyFormat(order.total_price)}</p>
                                </div>
                                {order.invoice.method == 'e-wallet' &&
                                    <PrimaryButton onClick={handlePayment} className='w-full mt-4 justify-center'><span className='text-sm'>Bayar sekarang</span></PrimaryButton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Payment.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>} children={page} />

export default Payment
