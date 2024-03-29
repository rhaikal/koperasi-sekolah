import { Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { IoMdClose } from "react-icons/io"
import { currencyFormat } from '@/helper'
import { Link, usePage } from '@inertiajs/inertia-react'
import { FaAngleLeft, FaAngleRight, FaUserSlash } from 'react-icons/fa'
import { MdRemoveShoppingCart } from 'react-icons/md'
import { Inertia } from '@inertiajs/inertia'

export default function CartSlideOver({open, setOpen, cart}) {
    const auth = usePage().props.auth;

    const handleChange = _.debounce((e, product) => {
        if(e.target.value) {
            if(e.target.value > product.stock) e.target.value = product.stock
            updateCart(e.target.value, product)
        }
    }, 400);

    const addQuantity = (e, product) => {
        const counter = e.target.previousSibling

        if (!counter) return;

        if(!!counter.value && parseInt(counter.value) < parseInt(counter.attributes.max.value)) counter.value++
        else if(!counter.value) counter.value = "1"

        if(counter.value < product.stock) updateCart(counter.value, product)
    }

    const subtractQuantity = (e, product) => {
        const counter = e.target.nextSibling

        if(!counter) return;

        if(!!counter.value && counter.value > 0) counter.value--;
        else counter.value = "1";

        if(counter.value < 1) Inertia.delete(route('order.destroy', product))
        else updateCart(counter.value, product);
    }

    const updateCart = _.debounce((value, product) => {
        const data = {
            quantity: value
        }

        Inertia.put(route("order.update", product), {quantity: value}, {preserveScroll: true})
    }, 600)


    const closeOnKeyEsc = (e) => {
        if(e.key === 'Escape') {
            setOpen(false)
            window.removeEventListener('keydown', closeOnKeyEsc)
            e.target.blur()
        }
    }

    if(open) window.addEventListener('keydown', closeOnKeyEsc)

    return (
        <Transition.Root show={open} as={Fragment} >
            <div className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                    onClick={() => setOpen(false)} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden w-fit">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="pointer-events-auto w-screen max-w-md" >
                                    <div className="flex h-full flex-col bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h1 className="text-lg font-medium text-gray-900">Keranjang Belanjaan</h1>
                                                <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <span className="sr-only">Close panel</span>
                                                    <IoMdClose className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {cart && cart.products.map((product) => {
                                                        if(product.stock === 0) Inertia.delete(route('order.destroy.exceed', product))
                                                        else if(product.pivot.quantity > product.stock) Inertia.put(route('order.update.exceed', product), {quantity: product.stock})
                                                        return (
                                                            <li key={product.id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={"/storage/" + product.image}
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <Link href={route("shop.show", product)}>{product.name}</Link>
                                                                        </h3>
                                                                        <p className="ml-4">{currencyFormat(product.pivot.subtotal_price)}</p>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <div className="flex items-center">
                                                                        <p className="text-gray-500 mr-2">Kuantitas</p>
                                                                        <FaAngleLeft onClick={(e) => subtractQuantity(e, product)} className='text-sm cursor-pointer w-5 text-gray-500 focus:text-gray-600' />
                                                                        <input type="number" min="1" max={product.stock} onBlur={(e) => e.target.value = product.pivot.quantity} onChangeCapture={(e) => handleChange(e, product)} defaultValue={product.pivot.quantity} name={`quantity`} className='w-5 border-0 focus:0 focus:shadow-none focus:ring-0 p-0 text-center text-sm text-gray-700' />
                                                                        <FaAngleRight onClick={(e) => addQuantity(e, product)} className='text-sm cursor-pointer w-5 text-gray-500 focus:text-gray-600' />
                                                                    </div>

                                                                    <div className="flex">
                                                                        <Link
                                                                            as="button"
                                                                            method="DELETE"
                                                                            href={route('order.destroy', product)}
                                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                            preserveScroll
                                                                        >
                                                                            Hapus
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {cart ?
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Total</p>
                                                    <p>{currencyFormat(cart.total_price)}</p>
                                                </div>
                                            <div className="mt-6">
                                                <Link
                                                href={route("checkout.index")}
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                onClick={() => setOpen(false)}
                                                >
                                                    Checkout
                                                </Link>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                atau &nbsp;
                                                {route().current("shop.index") ?
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Lanjut belanja
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button> :
                                                    <Link
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        href={route("shop.index")}
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Lanjut belanja
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </Link>
                                                }
                                                </p>
                                            </div>
                                            </div>
                                        : auth.user ?
                                            <div className="relative flex flex-col items-center top-[-35%]">
                                                <MdRemoveShoppingCart className='mb-5 w-20 h-20 font-bold text-center text-blue-200' />

                                                <p className="mb-8 text-center text-gray-500 md:text-lg">
                                                    Keranjang Kosong
                                                </p>

                                                <Link
                                                    href={route('shop.index')}
                                                    className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                                                    >Belanja Sekarang
                                                </Link>
                                            </div> :
                                            <div className="relative flex flex-col items-center top-[-35%]">
                                                <FaUserSlash className='mb-5 w-20 h-20 font-bold text-center text-blue-200' />

                                                <p className="mb-8 text-center text-gray-500 md:text-lg">
                                                    Harap login terlebih dahulu
                                                </p>

                                                <Link
                                                    href={route('login')}
                                                    className="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
                                                    >Login
                                                </Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </div>
        </Transition.Root>
    )
}
