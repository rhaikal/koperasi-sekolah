import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { createContext, useState } from "react";
import PrimaryButton from "@/Components/Button/PrimaryButton";
import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { SlOptionsVertical } from 'react-icons/sl'
import { Link } from "@inertiajs/inertia-react";
import CategoryModalForm from "@/Components/Dashboard/Modal/CategoryModalForm";
import CreateCategory from "./Partials/CreateCategory";

export const ModalContext = createContext()

const Category = ({categories}) => {
    const [open, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    return (
        <ModalContext.Provider value={{ open, setOpen, openModal }}>
            <div className="min-w-0 p-4 rounded-lg shadow-lg">
                <CreateCategory />
                <Table>
                    <Table.Head>
                        <Table.Header>Id</Table.Header>
                        <Table.Header>Name</Table.Header>
                        <Table.Header>Slug</Table.Header>
                        <Table.Header></Table.Header>
                    </Table.Head>
                    <Table.Body>
                        {categories.map((category) => (
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
        </ModalContext.Provider>
    )
}

Category.layout = page => <DashboardLayout children={page} header="Category" user={page.props.auth.user} />

export default Category
