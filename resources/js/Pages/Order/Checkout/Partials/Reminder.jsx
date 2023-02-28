import Swal from "sweetalert2/dist/sweetalert2.all"

export const handleCheckout = (e, form) => {
    e.preventDefault();

    Swal.fire({
        title: 'Apakah pesanan anda sudah benar',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Tidak',
        confirmButtonText: 'Ya'
    }).then((result) => {
        if(result.isConfirmed){
            form.post(route('checkout.store'))
        }
    })
}
