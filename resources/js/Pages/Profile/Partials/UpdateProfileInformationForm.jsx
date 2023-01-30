import React, { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/Input/InputError';
import InputLabel from '@/Components/Input/InputLabel';
import PrimaryButton from '@/Components/Button/PrimaryButton';
import TextInput from '@/Components/Input/TextInput';
import { Link, useForm, usePage } from '@inertiajs/inertia-react';
import { Transition } from '@headlessui/react';
import ImageUpload from '@/Components/Input/ImageUpload';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className }) {
    const user = usePage().props.auth.user;

    const form = useForm({
        profile: null,
        name: user.name,
        username: user.username,
        email: user.email,
        no_phone: user.no_phone ?? null,
        _method: 'PATCH'
    });

    const handleFile = (event) => {
        form.setData(event.target.name, event.target.files[0]);
    }

    const submit = (e) => {
        e.preventDefault();
        form.post(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div className='grid grid-cols-2'>
                    <div className='col-span-1'>
                        <ImageUpload
                            defaultValue={user.profile}
                            value={form.data.profile}
                            errors={form.errors.profile}
                            handleFile={handleFile}
                            name="profile"
                        />
                    </div>
                    <div className='ml-8 col-span-1'>
                        <div className='mb-2'>
                            <InputLabel for="name" value="Name" />

                            <TextInput
                                id="name"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.name}
                                handleChange={(e) => form.setData('name', e.target.value)}
                                required
                                autofocus
                                autocomplete="name"
                            />

                            <InputError className="mt-2" message={form.errors.name} />
                        </div>

                        <div className='mb-2'>
                            <InputLabel for="username" value="Username" />

                            <TextInput
                                id="username"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.username}
                                handleChange={(e) => form.setData('username', e.target.value)}
                                required
                                autocomplete="username"
                            />

                            <InputError className="mt-2" message={form.errors.username} />
                        </div>

                        <div className='mb-2'>
                            <InputLabel for="email" value="Email" />

                            <TextInput
                                id="email"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.email}
                                handleChange={(e) => form.setData('email', e.target.value)}
                                required
                                autocomplete="email"
                            />

                            <InputError className="mt-2" message={form.errors.email} />
                        </div>

                        <div className='mb-2'>
                            <InputLabel for="no_phone" value="Number Phone" />

                            <TextInput
                                id="no-phone"
                                type="text"
                                className="mt-1 block w-full"
                                value={form.data.no_phone}
                                handleChange={(e) => form.setData('no_phone', e.target.value)}
                                required
                                autocomplete="no_phone"
                            />

                            <InputError className="mt-2" message={form.errors.no_phone} />
                        </div>
                    </div>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={form.processing}>Save</PrimaryButton>

                    <Transition
                        show={form.recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
