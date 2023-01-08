import Header from "@/Components/Auth/Header";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import FloatingLabel from "@/Components/Input/FloatingLabel";
import InputError from "@/Components/Input/InputError";
import Select from "@/Components/Input/Select";
// import { inputCurrencyFormat, inputCurrencyDerange } from "@/helper";
import { Link, useForm } from "@inertiajs/inertia-react";
import { useEffect } from "react";
import { BsBack } from "react-icons/bs";

export default function ProductForm({categories, handleSubmit, header, product}) {
    const form = useForm({
        image: null,
        name: '',
        slug: '',
        category_id: '',
        price: '',
        stock: 0,
        description: '',
    });

    let options = []
    categories.map((category) => {
        options.push({
            value: category.id,
            label: category.name
        })
    })

    const handleChange = (event) => {
        form.setData(event.target.name, event.target.value)
    }

    const handleSelect = (data, attributes) => {
        form.setData(attributes.name, data.value);
    }

    const handleFile = (event) => {
        form.setData(event.target.name, event.target.files[0]);
    }

    const onSubmit = (event) => {
        event.preventDefault()
        handleSubmit(form)
    }

    useEffect(() => {
        if(form.data.image) {
            const previewImg = document.getElementById('preview-img')
            previewImg.src = URL.createObjectURL(form.data.image)
            previewImg.onload = () => URL.revokeObjectURL(previewImg.src)
        }
    }, [form.data.image])

    useEffect(() => {
        if(product) {
            const previewImg = document.getElementById('preview-img')
            form.setData({
                name: product.name,
                slug: product.slug,
                category_id: product.category_id,
                price: product.price,
                stock: product.stock,
                description: product.description
            })
            previewImg.src = "/storage/" + product.image
        }
    }, [product])

    return (
        <div className="p-6">
            <PrimaryButton className="flex"><BsBack className="mr-2" /><Link href={route('products.index')}>Back</Link></PrimaryButton>
            <div className="min-h-screen py-3 flex justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <form onSubmit={onSubmit}>
                        <div className="rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <Header className="text-center">{header}</Header>
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 ${form.errors.image ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 dark:border-gray-600 dark:hover:border-gray-500'}`}>
                                        {form.data.image || (!(_.isEmpty(product)) && product.image) ?
                                            <img id="preview-img" className="min-h-100 min-w-100 hover:opacity-75"></img>
                                        :
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                                <p className="text-xs text-center text-gray-500 dark:text-gray-400 tese">
                                                    SVG, PNG, JPG, JPEG, GIF, BMP, or WebP
                                                    <br />(MAX. 2000x2000px)
                                                </p>
                                            </div>
                                        }
                                        <input id="dropzone-file" type="file" name="image" onChange={handleFile} className="hidden" />
                                        {form.hasErrors && <InputError message={form.errors.image} className="mt-2" />}
                                    </label>
                                </div>

                                <div className="lg:col-span-2 self-center">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                                        <div className="md:col-span-3 my-1">
                                            <FloatingLabel
                                                id="name"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                isFocused={true}
                                                handleChange={handleChange}
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
                                                placeholder="Category"
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
                                                placeholder="Price"
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
                                                placeholder="Stock"
                                                value={form.data.stock}
                                                handleChange={handleChange}
                                                hasErrors={form.errors.stock}
                                            />
                                            {form.hasErrors && <InputError message={form.errors.stock} className="mt-2" />}
                                        </div>

                                        <div className="md:col-span-6 my-1">
                                            <textarea id="description" name="description" value={form.data.description} onChange={handleChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-center">
                                <div className="inline-flex items-center w-full">
                                    <PrimaryButton className="font-bold py-2 px-4 w-full justify-center">Submit</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
