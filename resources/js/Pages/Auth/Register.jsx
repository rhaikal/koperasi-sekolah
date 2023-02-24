import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import SecondaryButton, { secondaryButtonClass } from '@/Components/Button/SecondaryButton';
import TextInput from '@/Components/Input/TextInput';
import Label from '@/Components/Input/Label';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout header='Buat akun baru' imgSrc='http://127.0.0.1:8000/img/auth/create-account-office.jpeg' imgDarkSrc='http://127.0.0.1:8000/img/auth/create-account-office-dark.jpeg' imgAlt='Office...'>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel>
                        <Label>Nama</Label>

                        <TextInput
                            type="text"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </InputLabel>
                </div>

                <div className='mt-4'>
                    <InputLabel>
                        <Label>Username</Label>

                        <TextInput
                            type="text"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.username} className="mt-2" />
                    </InputLabel>
                </div>

                <div className="mt-4">
                    <InputLabel>
                        <Label>Email</Label>

                        <TextInput
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </InputLabel>
                </div>

                <div className="mt-4">
                    <InputLabel>
                        <Label>Password</Label>

                        <TextInput
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </InputLabel>
                </div>

                <div className="mt-4">
                    <InputLabel>
                        <Label>Confirm Password</Label>

                        <TextInput
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />

                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </InputLabel>
                </div>

                <div className='block ms-0 mt-4'>
                    <PrimaryButton processing={processing} className="w-full justify-center bg-indigo-500">
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <hr className='my-8'/>

            <div className='block ms-0 mt-4'>
                <a className={secondaryButtonClass + ' w-full justify-center hover:ring-1 hover:ring-gray-500'} href={route('socialite.redirect', 'google')}>
                    <FcGoogle className='text-base mr-2'/>
                    Google
                </a>
            </div>

            <div className="flex items-center mt-4">
                <Link
                    href={route('login')}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sudah terdaftar?
                </Link>
            </div>
        </GuestLayout>
    );
}
