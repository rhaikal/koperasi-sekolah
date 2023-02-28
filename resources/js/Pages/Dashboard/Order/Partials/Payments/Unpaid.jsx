import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2/dist/sweetalert2.all";

export const handlePayment = (e, order) => {
    e.preventDefault();

    Swal.fire({
        title: 'Apakah pesanan ini sudah dibayar',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
    }).then((result) => {
        if (result.isConfirmed) {
            Inertia.post(route('payment.store.cash', order))
        }
    })
}
