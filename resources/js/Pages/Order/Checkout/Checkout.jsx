import PrimaryButton from '@/Components/Button/PrimaryButton';
import { currencyFormat } from '@/helper';
import HomeLayout from '@/Layouts/HomeLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { BsCheck, BsThreeDots } from 'react-icons/bs';
import { FaAngleRight } from 'react-icons/fa';
import Select from "@/Components/Input/Select";
import InputLabel from '@/Components/Input/InputLabel';
import OrderSumarry from '../Partials/OrderSummary';
import { handleCheckout } from './Partials/Reminder';

const Checkout = ({cart, auth}) => {
    const form = useForm({
        method: null
    })

    const handleSelect = (data, attributes) => {
        form.setData(attributes.name, data.value);
    }

    return (
        <>
            <Head title='Checkout' />
            <div className="py-12">
                <div className="max-w-7xl sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Checkout</h1>
                            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                                <div className="relative">
                                    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                        <Link className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href={route("shop.index")}>
                                            <BsCheck className='h-6  w-6' />
                                        </Link>
                                        <span className="font-semibold text-gray-900">Shop</span>
                                        </li>
                                        <FaAngleRight className='h-4 w-4 text-gray-400' />
                                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 font-semibold text-white ring ring-gray-600 ring-offset-2 cursor-default" href="#">2</span>
                                            <span className="font-semibold text-gray-900">Checkout</span>
                                        </li>
                                        <FaAngleRight className='h-4 w-4 text-gray-400' />
                                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-500/90 font-semibold text-white">3</span>
                                            <span className="font-semibold text-gray-500">Pembayaran</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="grid sm:px-10 lg:grid-cols-2">
                            <OrderSumarry products={cart.products} />
                            <div className="mt-10 bg-gray-50 px-4 pt-6 pb-5 lg:mt-0">
                                <p className="text-xl font-medium">Detail Pembayaran</p>
                                <p className="text-gray-400">Selesaikan pesanan Anda dengan memilih metode pembayaran.</p>
                                <div className="mt-6 border-gray-400 border-b py-4 space-y-5">
                                    <div>
                                        <InputLabel for="name" value="Name" />
                                        <p className='text-lg'>{auth.user.name}</p>
                                    </div>
                                    <div>
                                        <InputLabel for="email" value="Email" />
                                        <p className='text-lg'>{auth.user.email}</p>
                                    </div>
                                    <div>
                                        <InputLabel for="phone" value="Phone Number" />
                                        <p className='text-lg'>{auth.user.no_phone ? auth.user.no_phone : <BsThreeDots className='h-7 w-7 text-gray-500'/>}</p>
                                    </div>
                                    <Select
                                        name={"method"}
                                        placeholder="Payment Method"
                                        options={[{ label: "Cash", value: "cash" }, { label: "E-Wallet", value: "e-wallet"}]}
                                        isSearchable={false}
                                        onChange={handleSelect}
                                        hasErrors={form.errors.method}
                                    />
                                </div>
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">Total</p>
                                    <p className="text-2xl font-semibold text-gray-900">{currencyFormat(cart.total_price)}</p>
                                </div>
                                <PrimaryButton className='w-full mt-4 justify-center' onClick={(e) => handleCheckout(e, form)}><span className='text-sm'>Checkout</span></PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


Checkout.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Home</h2>} children={page} />

export default Checkout
