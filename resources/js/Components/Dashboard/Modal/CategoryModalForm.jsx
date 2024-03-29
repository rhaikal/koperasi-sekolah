import React, { useContext, useEffect, useState } from "react";
import { useForm, usePage } from '@inertiajs/inertia-react';
import { ModalContext } from "@/Pages/Dashboard/Category/Category";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import SecondaryButton from "@/Components/Button/SecondaryButton";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Input/InputLabel";
import TextInput from "@/Components/Input/TextInput";
import InputError from "@/Components/Input/InputError";

export default function CategoryModalForm({onSubmit, header, button, category}) {
    const { open, setOpen } = useContext(ModalContext)
    const [ submit, setSubmit ] = useState(false)

    const form = useForm({
        name: '',
        slug: '',
    });

    useEffect(() => {
        if(category && open){
            form.setData({
                name: category.name,
                slug: category.slug
            })
        }
    }, [open])

    const closeModal = () => {
        setOpen(false)
        form.reset()
    };

    const handleChange = (event) => {
        form.setData(event.target.name, event.target.value)
    }

    const handleSlug = (event) => {
        let slug = event.target.value.toLowerCase();
        slug = slug.replace(/\s+/g, '-');

        form.setData('slug', slug);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(form)
        setSubmit(true)
    }

    useEffect(() => {
        if(submit && !form.hasErrors){
            closeModal()
        }
    }, [form.errors])

    return (
        <Modal show={open} onClose={closeModal}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-bold text-center text-gray-900">
                    {header}
                </h2>

                <div className="mt-6">
                    <InputLabel for="name" value="Nama" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={form.data.name}
                        handleChange={handleChange}
                        handleKeyUp={handleSlug}
                        className="mt-1 block w-full"
                        isFocused
                        placeholder="Name"
                    />

                    {form.hasErrors && <InputError message={form.errors.name} className="mt-2" />}
                </div>

                <div className="mt-6">
                    <InputLabel for="slug" value="Slug" />

                    <TextInput
                        id="slug"
                        type="text"
                        name="slug"
                        value={form.data.slug}
                        handleChange={handleChange}
                        className="mt-1 block w-full"
                        placeholder="Slug"
                    />

                    {form.hasErrors && <InputError message={form.errors.slug} className="mt-2" />}
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" processing={form.processing}>
                        {button ?? 'Submit'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    )
}
