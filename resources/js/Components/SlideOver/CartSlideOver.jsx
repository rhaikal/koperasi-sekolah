import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IoMdClose } from "react-icons/io"
import { currencyFormat } from '@/helper'
import { Link } from '@inertiajs/inertia-react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Inertia } from '@inertiajs/inertia'

export default function CartSlideOver({open, setOpen, order}) {
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

        updateCart(counter.value, product)
    }

    const subtractQuantity = (e, product) => {
        const counter = e.target.nextSibling

        if (!counter) return;

        if(!!counter.value && counter.value > 1) counter.value--
        else counter.value = "1"

        updateCart(counter.value, product)
    }

    const updateCart = _.debounce((value, product) => {
        const data = {
            quantity: value
        }

        Inertia.put(route("order.update", product), {quantity: value})
    }, 600)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
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
                                                    {order && order.products.map((product) => (
                                                    <li key={product.id} className="flex py-6">
                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img
                                                                src={"/storage" + product.image}
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
                                                                <p className="text-gray-500 mr-2">Qty</p>
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
                                                                >
                                                                    Remove
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </li>
                                                    ))}
                                                </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {order ?
                                            <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>{currencyFormat(order.total_price)}</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <a
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </a>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                or &nbsp;
                                                <button
                                                    type="button"
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                                </p>
                                            </div>
                                            </div>
                                        :
                                            <></>
                                        }
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
