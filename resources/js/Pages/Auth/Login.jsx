import React, { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Label from '@/Components/Label';
import Header from '@/Components/Header';
import SecondaryButton from '@/Components/SecondaryButton';
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        identity: '',
        password: '',
        remember: '',
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <GuestLayout header='Login' imgSrc='http://127.0.0.1:8000/img/auth/login-office.jpeg' imgDarkSrc='http://127.0.0.1:8000/img/auth/login-office-dark.jpeg' imgAlt='Office...'>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <div>
                    <InputLabel>
                        <Label>Email / Username</Label>
                        <TextInput
                            type="text"
                            name="identity"
                            value={data.identity}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                        />
                        <InputError message={errors.identity} className="mt-2" />
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
                            autoComplete="current-password"
                            handleChange={onHandleChange}
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </InputLabel>
                </div>

                <div className="block mt-4">
                    <label className="flex items-center">
                        <Checkbox name="remember" value={data.remember} handleChange={onHandleChange} />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                </div>

                <div className='block ms-0 mt-4'>
                    <PrimaryButton processing={processing} className="w-full justify-center bg-indigo-500">
                        Log in
                    </PrimaryButton>
                </div>
            </form>

            <hr className='my-8'/>

            <div className='block ms-0 mt-4'>
                <SecondaryButton processing={processing} className='w-full justify-center hover:ring-1 hover:ring-gray-500'>
                    <FaGithub className='text-base mr-2' />
                    Github
                </SecondaryButton>
            </div>

            <div className='block ms-0 mt-4'>
                <SecondaryButton processing={processing} className='w-full justify-center hover:ring-1 hover:ring-gray-500'>
                    <FcGoogle className='text-base mr-2'/>
                    Google
                </SecondaryButton>
            </div>

            <div className="flex items-center justify-between mt-4">
                <Link
                    href={route('register')}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create new account
                </Link>
                {canResetPassword && (
                    <Link
                        href={route('password.request')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Forgot your password?
                    </Link>
                )}
            </div>
        </GuestLayout>
    );
}
