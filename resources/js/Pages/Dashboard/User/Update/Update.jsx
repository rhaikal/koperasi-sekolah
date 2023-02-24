import Header from "@/Components/Auth/Header";
import PrimaryButton, { primaryButtonClass } from "@/Components/Button/PrimaryButton";
import FloatingLabel from "@/Components/Input/FloatingLabel";
import ImageUpload from "@/Components/Input/ImageUpload";
import InputError from "@/Components/Input/InputError";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { BsBack } from "react-icons/bs";
import Select from "@/Components/Input/Select";

const UpdateUser = ({user}) => {
    const form = useForm({
        profile: null,
        role: user.role,
        name: user.name,
        username: user.username,
        email: user.email,
        no_phone: user.no_phone,
        _method: 'PATCH'
    });

    const options = [
        {
            value: '1',
            label: 'Siswa',
        },
        {
            value: '2',
            label: 'Anggota',
        },
        {
            value: '3',
            label: 'Pengurus',
        },
    ]

    const handleChange = (event) => {
        form.setData(event.target.name, event.target.value)
    }

    const handleSelect = (data, attributes) => {
        form.setData(attributes.name, data.value);
    }

    const handleFile = (event) => {
        form.setData(event.target.name, event.target.files[0]);
    }

    const onSubmit = (event, user) => {
        event.preventDefault()
        form.post(route('users.update', user));
    }

    return (
        <div className="p-6">
            <Link className={primaryButtonClass} href={route('users.index')}><BsBack className="mr-2" /> Kembali</Link>
            <div className="min-h-screen py-3 flex justify-center">
                <div className="container max-w-screen-lg mx-auto">
                <form onSubmit={(event) => onSubmit(event, user)}>
                        <div className="rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <Header className="text-center">Update User</Header>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="flex items-center justify-center w-full">
                                    <ImageUpload
                                        defaultValue={user?.profile ?? "img/users/placeholder.png"}
                                        value={form.data.profile ?? null}
                                        handleFile={handleFile}
                                        errors={form.errors?.profile ?? null}
                                        name="profile"
                                    />
                                </div>

                                <div className="lg:col-span-2 self-center">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-6 my-1">
                                            <Select
                                                name={"role"}
                                                placeholder="Peran"
                                                options={options}
                                                onChange={handleSelect}
                                                hasErrors={form.errors.role}
                                                defaultValue={form.data.role}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.role} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-3 my-1">
                                            <FloatingLabel
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Nama"
                                                isFocused={true}
                                                handleChange={handleChange}
                                                value={form.data.name}
                                                hasErrors={form.errors.name}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.name} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-3 my-1">
                                            <FloatingLabel
                                                id="username"
                                                type="text"
                                                name="username"
                                                placeholder="Username"
                                                value={form.data.username}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.username}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.username} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-4 my-1">
                                            <FloatingLabel
                                                id="email"
                                                type="text"
                                                name="email"
                                                placeholder="Email"
                                                value={form.data.email}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.email}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.email} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-2 my-1">
                                            <FloatingLabel
                                                id="no_phone"
                                                type="text"
                                                name="no_phone"
                                                placeholder="Nomor Telepon"
                                                value={form.data.no_phone}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.no_phone}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.no_phone} className="mt-2" />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <div className="inline-flex items-center w-full">
                                    <PrimaryButton className="font-bold py-2 px-4 w-full justify-center">Simpan</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

UpdateUser.layout = page => <DashboardLayout children={page}/>

export default UpdateUser;
