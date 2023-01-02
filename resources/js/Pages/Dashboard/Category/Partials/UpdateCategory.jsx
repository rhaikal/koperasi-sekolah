import Dropdown from "@/Components/Dropdown/Dropdown";
import { Inertia } from "@inertiajs/inertia";
import React, { useContext } from "react";
import { ModalContext } from "../Category";

export default function UpdateCategory({category}) {
    const { openModal } = useContext(ModalContext)

    const handleSubmit = (data) => {
        Inertia.put(route('categories.update', category), data)
    }

    return (
        <Dropdown.Link onClick={(e) => {e.preventDefault; openModal(handleSubmit, 'Edit Category', 'Change', category)}}>
            Update
        </Dropdown.Link>
        // <a onClick={(e) => {e.preventDefault; openModal(handleSubmit, 'Edit Category', 'Change', category)}} className="flex w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
            // Update
        // </a>
    )
}
