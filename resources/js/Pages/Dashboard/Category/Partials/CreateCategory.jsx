import PrimaryButton from "@/Components/Button/PrimaryButton";
import React, { useContext } from "react";
import { ModalContext } from "../Category";
import { Inertia } from "@inertiajs/inertia";

export default function CreateCategory() {
    const { openModal } = useContext(ModalContext);

    const handleSubmit = (form) => {
        form.post(route('categories.store'));
    }

    return (
        <PrimaryButton onClick={() => (openModal(handleSubmit, 'Add New Category', 'Create'))} className="mb-4 text-gray-500 float-right bg-violet-500 focus:bg-violet-600 focus:ring-violet-400 hover:bg-violet-600 dark:bg-gray-200">
            Create Category
        </PrimaryButton>
    )
}
