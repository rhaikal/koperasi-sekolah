import PrimaryButton from "@/Components/Button/PrimaryButton";
import CategoryModalForm from "@/Components/Dashboard/Modal/CategoryModalForm";
import React, { useContext } from "react";
import { ModalContext } from "../Category";
import { Inertia } from "@inertiajs/inertia";

export default function CreateCategory() {
    const { openModal } = useContext(ModalContext);

    const handleSubmit = (data) => {
        Inertia.post(route('categories.store'), data)
    }

    return (
        <>
            <CategoryModalForm onSubmit={handleSubmit} header="Add New Category" button="Create"  />
            <PrimaryButton onClick={openModal} className="mb-4 text-gray-500 float-right bg-violet-500 focus:bg-violet-600 focus:ring-violet-400 hover:bg-violet-600 dark:bg-gray-200">
                Create Category
            </PrimaryButton>
        </>
    )
}
