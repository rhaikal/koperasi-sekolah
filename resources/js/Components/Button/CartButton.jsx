import { FaShoppingCart } from "react-icons/fa"

export default function CartButton({onClick, className, count}) {
    return (
        <button type="button" className={`cart inline-flex align-middle relative text-gray-400 hover:text-gray-800 ${className}`} onClick={onClick}>
            <FaShoppingCart className="h-6 w-6" />
            {count &&
                <span className="absolute -top-1 -right-2 px-[0.5em] py-[0.30em] text-[0.55em] font-bold leading-none text-white bg-red-500 rounded">{count}</span>
            }
        </button>
    )
}
