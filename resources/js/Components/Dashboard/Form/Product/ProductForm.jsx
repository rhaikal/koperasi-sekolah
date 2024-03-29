import Header from "@/Components/Auth/Header";
import PrimaryButton, { primaryButtonClass } from "@/Components/Button/PrimaryButton";
import FloatingLabel from "@/Components/Input/FloatingLabel";
import ImageUpload from "@/Components/Input/ImageUpload";
import InputError from "@/Components/Input/InputError";
import Select from "@/Components/Input/Select";
// import { inputCurrencyFormat, inputCurrencyDerange } from "@/helper";
import { Link, useForm } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { BsBack } from "react-icons/bs";

export default function ProductForm({categories, handleSubmit, header, product}) {
    const [options] = useState([]);

    const form = useForm({
        image: null,
        name: '',
        slug: '',
        category_id: '',
        price: '',
        stock: 0,
        description: '',
    });

    useEffect(() => {
        categories.map((category) => {
            options.push({
                value: category.id,
                label: category.name
            })
        })
    }, [])

    const handleChange = (event) => {
        form.setData(event.target.name, event.target.value)
    }

    const handleSelect = (data, attributes) => {
        form.setData(attributes.name, data.value);
    }

    const handleFile = (event) => {
        form.setData(event.target.name, event.target.files[0]);
    }

    const handleSlug = (event) => {
        let slug = event.target.value.toLowerCase();
        slug = slug.replace(/\s+/g, '-');

        form.setData('slug', slug);
    }

    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(form)
    }

    useEffect(() => {
        if(product && !form.hasErrors) {
            form.setData({
                name: product.name,
                slug: product.slug,
                category_id: product.category_id,
                price: product.price,
                stock: product.stock,
                description: product.description,
                '_method': 'PUT'
            })
        }
    }, [product])

    return (
        <div className="p-6">
            <Link className={primaryButtonClass} href={route('products.index')}><BsBack className="mr-2" /> Kembali</Link>
            <div className="min-h-screen py-3 flex justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <form onSubmit={onSubmit}>
                        <div className="rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <Header className="text-center">{header}</Header>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="flex items-center justify-center w-full">
                                    <ImageUpload
                                        defaultValue={product?.image ?? null}
                                        value={form.data.image ?? null}
                                        handleFile={handleFile}
                                        errors={form.errors?.image ?? null}
                                        name="image"
                                    />
                                </div>

                                <div className="lg:col-span-2 self-center">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-3 my-1">
                                            <FloatingLabel
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Nama"
                                                isFocused={true}
                                                handleChange={handleChange}
                                                handleKeyUp={handleSlug}
                                                value={form.data.name}
                                                hasErrors={form.errors.name}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.name} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-3 my-1">
                                            <FloatingLabel
                                                id="slug"
                                                type="text"
                                                name="slug"
                                                placeholder="Slug"
                                                value={form.data.slug}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.slug}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.slug} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-6 my-1">
                                            <Select
                                                name={"category_id"}
                                                placeholder="Kategori"
                                                options={options}
                                                onChange={handleSelect}
                                                hasErrors={form.errors.category_id}
                                                defaultValue={form.data.category_id}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.category_id} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-4 my-1">
                                            <FloatingLabel
                                                id="price"
                                                type="text"
                                                name="price"
                                                placeholder="Harga"
                                                value={form.data.price}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.price}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.price} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-2 my-1">
                                            <FloatingLabel
                                                id="stock"
                                                type="number"
                                                name="stock"
                                                placeholder="Stok"
                                                value={form.data.stock}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.stock}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.stock} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-6 my-1">
                                            <textarea id="description" name="description" value={form.data.description} onChange={handleChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Deskripsi"></textarea>
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
