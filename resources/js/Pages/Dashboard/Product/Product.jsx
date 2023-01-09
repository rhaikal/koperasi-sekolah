import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { SlOptionsVertical } from 'react-icons/sl'
import DeleteDrodownLink from "@/Components/Dashboard/Form/DeleteDropdownLink";
import Pagination from "@/Components/Pagination/Pagination";
import { currencyFormat } from "@/helper";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import { Link } from "@inertiajs/inertia-react";

const Product = ({products}) => {
    return (
        <div className="min-w-0 p-4 overflow-x-auto rounded-lg shadow-lg">
            <PrimaryButton className="mb-4 text-gray-500 float-right"><Link href={route("products.create")}>Create Product</Link></PrimaryButton>
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
                    {products.data.map((product) => (
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
                    ))}
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
