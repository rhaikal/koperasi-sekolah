import Dropdown from "@/Components/Dropdown/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import React, { useContext } from "react";
import { ModalContext } from "../Category";

export default function UpdateCategory({category}) {
    const { openModal } = useContext(ModalContext)

    const handleSubmit = (form) => {
        form.put(route('categories.update', category))
    }

    return (
        <Dropdown.Link onClick={(e) => {e.preventDefault; openModal(handleSubmit, 'Edit Category', 'Change', category)}}>
            Update
        </Dropdown.Link>
    )
}
