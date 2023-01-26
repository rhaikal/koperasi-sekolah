import Pagination from "@/Components/Pagination/Pagination"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Inertia } from "@inertiajs/inertia"
import Swal from "sweetalert2/dist/sweetalert2.all"
import TableOrder from "../Partials/TableOrder"

export const handlePayment = (e, order) => {
    e.preventDefault();

    Swal.fire({
        title: 'Has this order been paid',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            Inertia.post(route('payment.store.cash', order))
        }
    })
}

const Unpaid = ({ orders }) => {
    return (
        <div className="min-w-0 p-4 pt-8 overflow-x-auto rounded-lg shadow-lg">
            <TableOrder
                orders={orders}
                alt="Unpaid Order Not Found"
                detailRoute={'order.unpaid.show'}
                action={{ condition: 1, name: 'Pay', handle: handlePayment}}
            />
            {!_.isEmpty(orders.data) && <Pagination links={orders.links} from={orders.from} to={orders.to} total={orders.total} />}
        </div>
    )
}

Unpaid.layout = page => <DashboardLayout children={page} header="Unpaid Order" />

export default Unpaid
