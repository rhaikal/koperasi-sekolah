import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { SlOptionsVertical } from 'react-icons/sl'
import DeleteDrodownLink from "@/Components/Dashboard/Form/DeleteDropdownLink";
import Pagination from "@/Components/Pagination/Pagination";
import { currencyFormat } from "@/helper";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { Link } from "@inertiajs/inertia-react";
import { FaAngleDown } from "react-icons/fa";
import { Inertia } from "@inertiajs/inertia";


const Product = ({products, categories, query }) => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryStart, setCategoryStart] = useState(0);
    const currentCategory = categories.find((value) => {
        return value.id == query.category;
    })

    useEffect(() => {
        setCategoriesList(categories.slice(categoryStart, categoryStart + 5));
    }, [categoryStart]);

    const nextCategories = (e) => {
        e.preventDefault();
        if(categoryStart < categories.length - 6)
            setCategoryStart(categoryStart + 5);
    }

    const prevCategories = (e) => {
        e.preventDefault();
        if(categoryStart > 0)
            setCategoryStart(categoryStart - 5);
    }

    const handleSearch = _.debounce((e) => {
        const preserveQuery = {
            category: query?.category
        };

        if(e.target.value) Inertia.get(route('products.index'), {preserveQuery, search: e.target.value}, options)
        else Inertia.get(route('products.index', {preserveQuery}), options)
    }, 1000)

    return (
        <div className="min-w-0 p-4 overflow-x-auto rounded-lg shadow-lg">
            <div className="flex justify-between py-4">
                <div className="scale-100 flex">
                    <Dropdown>
                        <Dropdown.Trigger className="flex"><button className="flex z-10 items-center px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">{currentCategory?.name ?? "Category"} <FaAngleDown className="ml-2 w-4 h-4"></FaAngleDown></button></Dropdown.Trigger>
                        <Dropdown.Content align="left">
                            {categoriesList.map((category) => (
                                <Dropdown.Link key={category.id} href={route('products.index')} data={{ category: category.id }}>{category.name}</Dropdown.Link>
                            ))}
                            <div className="flex justify-between m-1 items-center text-white">
                                <Link as="button" preserveState onClick={prevCategories} className="flex-auto py-1 bg-indigo-600 rounded-l-lg hover:bg-indigo-500 hover:text-white">prev</Link>
                                <Link as="button" preserveState onClick={nextCategories} className="flex-auto py-1 bg-indigo-600 rounded-r-lg hover:bg-indigo-500 hover:text-white">next</Link>
                            </div>
                        </Dropdown.Content>
                    </Dropdown>
                    <div className="w-80">
                        <input type="search" defaultValue={query?.search ?? null} onChange={handleSearch} id="search-dropdown" className="w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search products by name or slug" />
                    </div>
                </div>
                <PrimaryButton className="text-gray-500"><Link href={route("products.create")}>Create Product</Link></PrimaryButton>
            </div>
            <Table>
                <Table.Head>
                    <Table.Header>Id</Table.Header>
                    <Table.Header>Image</Table.Header>
                    <Table.Header>Name</Table.Header>
                    <Table.Header>Category</Table.Header>
                    <Table.Header>Price</Table.Header>
                    <Table.Header>Stock</Table.Header>
                    <Table.Header></Table.Header>
                </Table.Head>
                <Table.Body>
                    {!(_.isEmpty(products.data)) ? products.data.map((product) => (
                        <Table.Row key={product.id}>
                            <Table.Content type="header" className="w-auto">{product.id}</Table.Content>
                            <Table.Content type="image"><img src={ "/storage/"+product.image} alt="test" /></Table.Content>
                            <Table.Content>{product.name}</Table.Content>
                            <Table.Content>{product.category.name}</Table.Content>
                            <Table.Content>{currencyFormat(product.price)}</Table.Content>
                            <Table.Content>{product.stock}</Table.Content>
                            <Table.Content>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('products.show', product)}>Detail</Dropdown.Link>
                                        <Dropdown.Link href={route('products.edit', product)}>Update</Dropdown.Link>
                                        <DeleteDrodownLink href={route('products.destroy', product)} />
                                    </Dropdown.Content>
                                </Dropdown>
                            </Table.Content>
                        </Table.Row>
                    )) :
                        <Table.Row>
                            <Table.Content type="header" colSpan={"7"} className="text-center text-base text-gray-500 font-semibold italic">Product Not Found</Table.Content>
                        </Table.Row>
                    }
                    <Table.Row>
                        <Table.Content colSpan={7} className="pb-0">
                            <Pagination links={products.links} from={products.from} to={products.to} total={products.total} />
                        </Table.Content>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    )
}

Product.layout = page => <DashboardLayout children={page} header="Product"></DashboardLayout>

export default Product
