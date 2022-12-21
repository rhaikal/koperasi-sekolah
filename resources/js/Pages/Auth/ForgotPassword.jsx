import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import InputFloatingLabel from '@/Components/InputFloatingLabel';
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
        <GuestLayout header='Forgot Password' imgSrc='http://127.0.0.1:8000/img/auth/forgot-password-office.jpeg' imgDarkSrc='http://forgot-password-office-dark.jpeg' imgAlt='Office'>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <InputFloatingLabel
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
                        Send To Email
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
