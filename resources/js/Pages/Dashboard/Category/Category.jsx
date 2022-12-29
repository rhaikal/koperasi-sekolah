import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { SlOptionsVertical } from 'react-icons/sl'
import { Link } from "@inertiajs/inertia-react";

const Category = (props) => {
    return (
        <div className="min-w-0 p-4 rounded-lg shadow-lg">
                <PrimaryButton className="mb-4 text-gray-500 float-right bg-violet-500 focus:bg-violet-600 focus:ring-violet-400 hover:bg-violet-600 dark:bg-gray-200">
                    <Link href="#">
                        Create Category
                    </Link>
                </PrimaryButton>
                <Table>
                    <Table.Head>
                        <Table.Header>Id</Table.Header>
                        <Table.Header>Name</Table.Header>
                        <Table.Header>Slug</Table.Header>
                        <Table.Header></Table.Header>
                    </Table.Head>
                    <Table.Body>
                        {props.categories.map((category) => (
                            <Table.Row key={category.id}>
                                <Table.Content type="header">{category.id}</Table.Content>
                                <Table.Content>{category.name}</Table.Content>
                                <Table.Content>{category.slug}</Table.Content>
                                <Table.Content>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href="/">Test</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </Table.Content>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
        </div>
    )
}

Category.layout = page => <DashboardLayout children={page} header="Category" user={page.props.auth.user} />

export default Category
