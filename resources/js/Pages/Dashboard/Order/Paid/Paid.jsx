import Pagination from "@/Components/Pagination/Pagination"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Inertia } from "@inertiajs/inertia"
import Swal from "sweetalert2/dist/sweetalert2.all"
import TableOrder from "../Partials/TableOrder"

export const handlePickup = (e, order) => {
    e.preventDefault()

    Swal.fire({
        title: 'Has this order been taken',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            Inertia.post(route('pickup.store', order))
        }
    })
}

const Paid = ({ orders }) => {
    return (
        <div className="min-w-0 p-4 pt-8 overflow-x-auto rounded-lg shadow-lg">
            <TableOrder
                orders={orders}
                alt="Paid Order Not Found"
                detailRoute={'order.paid.show'}
                action={{ condition: 2, name: 'Take', handle: handlePickup}}
            />
            {!_.isEmpty(orders.data) && <Pagination links={orders.links} from={orders.from} to={orders.to} total={orders.total} />}
        </div>
    )
}

Paid.layout = page => <DashboardLayout children={page} header="Paid Order" />

export default Paid
