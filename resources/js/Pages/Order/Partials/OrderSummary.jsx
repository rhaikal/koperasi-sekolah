import { currencyFormat } from "@/helper";

export default function OrderSumarry({products, containerClassnames}){
    return (
        <div className={`px-4 pt-6 pb-4 ${containerClassnames}`}>
            <p className="text-xl font-medium">Ringkasan Pesanan</p>
            <p className="text-gray-400">Periksa pesanan anda</p>
            <ul className="mt-8 space-y-3 rounded-lg border max-h-72 overflow-auto bg-white px-2 sm:px-4 py-4">
                {products.map((product) => (
                    <li className='flex' key={product.id}>
                        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`/storage/${product.image}`} alt="" />
                        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <div>
                                <div className="flex w-full flex-col px-4 py-4">
                                    <h3 className='text-lg font-medium text-gray-800'>{product.name}</h3>
                                    <p className='font-bold text-sm'>{currencyFormat(product.pivot.subtotal_price)}</p>
                                </div>
                                <div className='flex flex-1 items-end text-sm px-4'>
                                    <div className="flex items-center text-sm">
                                        <p className="text-gray-500 mr-2">Kuantitas :</p>
                                        <p className='text-gray-700'>{product.pivot.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
