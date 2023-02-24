import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import FloatingLabel from '@/Components/Input/FloatingLabel';
import { Head, useForm } from '@inertiajs/inertia-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout header='Lupa Password' imgSrc='http://127.0.0.1:8000/img/auth/forgot-password-office.jpeg' imgDarkSrc='http://forgot-password-office-dark.jpeg' imgAlt='Office'>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Lupa kata sandi anda? Tidak masalah. Beri tahu kami alamat email anda dan kami akan mengirimkan link reset password melalui email
                yang memungkinkan anda mengubah kata sandi anda.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <FloatingLabel
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={data.email}
                    className=""
                    isFocused={true}
                    handleChange={onHandleChange}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center mt-4">
                    <PrimaryButton className="block justify-center bg-indigo-500 w-full" processing={processing}>
                        Kirim Ke Email
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
