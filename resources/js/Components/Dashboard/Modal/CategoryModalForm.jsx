import React, { useContext } from "react";
import { useForm, usePage } from '@inertiajs/inertia-react';
import { ModalContext } from "@/Pages/Dashboard/Category/Category";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import SecondaryButton from "@/Components/Button/SecondaryButton";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/Input/InputLabel";
import TextInput from "@/Components/Input/TextInput";
import InputError from "@/Components/Input/InputError";

export default function CategoryModalForm({onSubmit, header, button}) {
    const { open, setOpen } = useContext(ModalContext)
    const { errors } = usePage().props

    const {
        data,
        setData,
        processing,
        reset,
    } = useForm({
        name: '',
        slug: '',
    });

    const closeModal = () => {
        setOpen(false);
        reset();
    };

    const handleChange = (event) => {
        setData(event.target.name, event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(data)
        if(_.isEmpty(errors)) {
            closeModal()
        }
    }

    return (
        <Modal show={open} onClose={closeModal}>
            <form onSubmit={handleSubmit} className="p-6">
                <h2 className="text-lg font-bold text-center text-gray-900">
                    {header}
                </h2>

                <div className="mt-6">
                    <InputLabel for="name" value="Name" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        handleChange={handleChange}
                        className="mt-1 block w-full"
                        isFocused
                        placeholder="Name"
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-6">
                    <InputLabel for="slug" value="Slug" />

                    <TextInput
                        id="slug"
                        type="text"
                        name="slug"
                        value={data.slug}
                        handleChange={handleChange}
                        className="mt-1 block w-full"
                        placeholder="Slug"
                    />

                    <InputError message={errors.slug} className="mt-2" />
                </div>

                <div className="mt-6 flex justify-end">
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <PrimaryButton className="ml-3" processing={processing}>
                        {button ?? 'Submit'}
                    </PrimaryButton>
                </div>
            </form>
        </Modal>
    )
}
