import Image from '@/Components/Auth/Image'
import PrimaryButton from '@/Components/Button/PrimaryButton'
import FloatingLabel from '@/Components/Input/FloatingLabel'
import { currencyFormat } from '@/helper'
import HomeLayout from '@/Layouts/HomeLayout'
import { Link } from '@inertiajs/inertia-react'
import { BsBack } from 'react-icons/bs'

export default function Detail({errors, auth, product}) {
    return (
        <HomeLayout
            auth={auth}
            errors={errors}
        >
            <div className="py-12 px-5 sm:px-10">
                <div className="max-w-7xl">
                    <PrimaryButton className='mb-5'>
                        <Link href={route('shop.index')} className="flex">
                            <BsBack className='mr-2 w-4 h-4' /> Back
                        </Link>
                    </PrimaryButton>
                    <div className="bg-white overflow-hidden shadow-md sm:rounded-lg p-3">
                        <div className="flex flex-col overflow-y-auto md:flex-row">
                            <div className="h-auto md:h-auto md:w-1/2">
                                <Image src={"/storage/img/products/placeholder.jpg"} alt={"product"}></Image>
                            </div>
                            <div className="sm:p-8 md:w-1/2 flex items-center">
                                <div>
                                    <span className='text-lg md:text-base uppercase font-bold text-gray-500'>{product.category.name}</span>
                                    <h2 className='font-semibold text-3xl my-3 capitalize'>{product.name}</h2>
                                    <p className='font-bold text-2xl mb-2 leading-loose text-red-600'>{currencyFormat(product.price)}</p>
                                    <p className='text-lg md:text-base leading-loose text-stone-600'>{product.description}</p>
                                    <div className="inline-flex items-center justify-center w-full">
                                        <hr className="w-11/12 h-px my-8 bg-gray-500/50 border-0 dark:bg-gray-700" />
                                        <span className="absolute px-3 font-bold text-gray-500 bg-white dark:text-white dark:bg-gray-900">Stock : {product.stock}</span>
                                    </div>
                                    <form className='grid gap-2 grid-cols-11 justify-between items-center'>
                                        <div className='col-span-10 lg:col-span-8'>
                                            <FloatingLabel
                                                id="quantity"
                                                type="number"
                                                name="quantity"
                                                placeholder="Quantity"
                                                max={product.stock}
                                            />
                                        </div>
                                        <div className='col-span-10 text-center mt-3 lg:mt-0 lg:col-span-3'>
                                            <PrimaryButton type='submit' className='uppercase'>Add To Cart</PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    )
}
