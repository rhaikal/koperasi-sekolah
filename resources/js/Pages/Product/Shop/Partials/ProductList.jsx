import ProductPagination from "@/Components/Pagination/ProductPagination"
import { currencyFormat } from "@/helper"
import { Link } from "@inertiajs/inertia-react"
import { BiSearch } from "react-icons/bi"

export default function ProductList({products, links}) {
    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl lg:max-w-7xl">
                    <h2 className="sr-only">Products</h2>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="flex justify-between flex-col product-item overflow-hidden group shadow-lg p-2">
                            <div>
                            <div className="relative product-item-pic aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <img
                                src={"/storage/img/products/placeholder.jpg"}
                                alt={product.imageAlt}
                                className="h-full w-full rounded-lg object-cover object-center group-hover:opacity-75"
                                />
                                <ul className="product-hover absolute top-6 right-[-200px] cursor-pointer transition-all duration-700">
                                    <li className="bg-indigo-100 p-1 rounded border border-indigo-400">
                                        <Link href={route("shop.show", product)}>
                                            <BiSearch className="w-7 h-7 lg:h-5 lg:w-5 text-indigo-400" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-item-text relative pt-6">
                                <Link method="POST" as="button" href={route("order.store", product)} data={{ quantity: 1 }} preserveScroll className="absolute z-50 top-0 left-0 add-cart no-underline opacity-0 text-lg lg:text-base font-semibold text-indigo-500 transition-all duration-500">+ Add To Cart</Link>
                                <h6 className="text-lg top-0 left-0 lg:text-base font-semibold text-gray-700 transition-all duration-500">{product.name}</h6>
                            </div>
                            </div>
                            <div>
                                <h5 className="mt-1 text-lg lg:text-base font-bold text-gray-600">{currencyFormat(product.price)}</h5>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
            <ProductPagination links={links} />
        </>
    )
}
