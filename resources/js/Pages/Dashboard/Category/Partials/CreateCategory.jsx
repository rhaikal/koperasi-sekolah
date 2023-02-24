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
        <PrimaryButton onClick={() => (openModal(handleSubmit, 'Buat Kategori Baru', 'Simpan'))} className="mb-4 float-right">
            Buat Kategori
        </PrimaryButton>
    )
}
