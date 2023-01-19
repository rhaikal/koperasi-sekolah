import { useState } from 'react'
import HomeLayout from '@/Layouts/HomeLayout'
import ResponsiveProductFilter from '@/Components/SlideOver/ProductFilterSlideOver'
import { FaFilter, FaMinus, FaPlus } from 'react-icons/fa'
import ProductList from './Partials/ProductList'
import { Disclosure, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/inertia-react'

const Shop = ({categories, products}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-md sm:rounded-lg">
                    <ResponsiveProductFilter categories={categories} mobileFiltersOpen={mobileFiltersOpen} setMobileFiltersOpen={setMobileFiltersOpen} />

                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shop</h1>

                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                                    onClick={() => setMobileFiltersOpen(true)}
                                >
                                    <span className="sr-only">Filters</span>
                                    <FaFilter className='h-5 w-5' aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <section aria-labelledby="products-heading" className="pt-6 pb-6">
                            <h2 id="products-heading" className="sr-only">
                            Products
                            </h2>

                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                                <form className="hidden lg:block">
                                    <h3 className="sr-only">Categories</h3>
                                    <Disclosure as="div" className="border-b border-gray-200 py-6">
                                        {({ open }) => (
                                        <>
                                            <h3 className="flow-root">
                                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                <span className="font-bold text-base text-gray-900">Categories</span>
                                                <span className="ml-6 flex items-center">
                                                    {open ?
                                                        <FaMinus /> : <FaPlus />
                                                    }
                                                </span>
                                            </Disclosure.Button>
                                            </h3>
                                            <Transition
                                                enter="transition duration-500 ease-out"
                                                enterFrom="transform scale-95 opacity-0"
                                                enterTo="transform scale-100 opacity-100"
                                                leave="transition duration-500 ease-out"
                                                leaveFrom="transform scale-100 opacity-100"
                                                leaveTo="transform scale-95 opacity-0"
                                            >
                                                <Disclosure.Panel className="pt-4">
                                                <div className="space-y-4">
                                                    {categories.map((category) => (
                                                        <div key={category.id} className="flex items-center">
                                                            <Link
                                                                href={route('shop.index')}
                                                                data={{ category: category.id }}
                                                                className="ml-3 text-sm text-gray-600"
                                                            >
                                                                {category.name}
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                                </Disclosure.Panel>
                                            </Transition>
                                        </>
                                        )}
                                    </Disclosure>
                                </form>

                                <div className="lg:col-span-3">
                                    <ProductList products={products.data} links={products} />
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

Shop.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} children={page} />

export default Shop
