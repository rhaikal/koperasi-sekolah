import Dropdown from "@/Components/Dropdown/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import React from "react";
import Swal from "sweetalert2/dist/sweetalert2.all";

export default function DeleteDrodownLink({href}) {

    const handleClick = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              Inertia.delete(href);
            }
        })
    }

    return (
        <Dropdown.Link onClick={(e)  => handleClick(e)}>Delete</Dropdown.Link>
    )
}
