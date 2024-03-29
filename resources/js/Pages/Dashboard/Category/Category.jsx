import DashboardLayout from "@/Layouts/DashboardLayout";
import React, { createContext, useEffect, useState } from "react";
import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import { SlOptionsVertical } from 'react-icons/sl'
import CreateCategory from "./Partials/CreateCategory";
import UpdateCategory from "./Partials/UpdateCategory";
import CategoryModalForm from "@/Components/Dashboard/Modal/CategoryModalForm";
import DeleteDrodownLink from "@/Components/Dashboard/Form/DeleteDropdownLink";
import Pagination from "@/Components/Pagination/Pagination";
import { Head } from "@inertiajs/inertia-react";

export const ModalContext = createContext()

const Category = ({categories}) => {
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(Object);
    const [emptyCategory, setEmptyCategory] = useState(false);

    useEffect(() => {
        if(_.isEmpty(categories?.data))
            setEmptyCategory(true);
    }, [])

    const openModal = (onSubmit, header, button, category=null) => {
        setModal({
            onSubmit: onSubmit,
            header: header,
            button: button,
            category: category ?? null
        })
        setOpen(true);
    };

    return (
        <>
            <Head title="Kategori" />
            <ModalContext.Provider value={{ open, setOpen, openModal }}>
                <div className="min-w-0 p-4 overflow-x-auto rounded-lg shadow-lg">
                    { open && <CategoryModalForm onSubmit={modal.onSubmit} header={modal.header} button={modal.button} category={modal.category} /> }
                    <CreateCategory />
                    <Table>
                        <Table.Head>
                            <Table.Header>Id</Table.Header>
                            <Table.Header>Nama</Table.Header>
                            <Table.Header>Slug</Table.Header>
                            <Table.Header></Table.Header>
                        </Table.Head>
                        <Table.Body>
                            {
                                !emptyCategory ? categories.data.map((category) => (
                                    <Table.Row key={category.id}>
                                        <Table.Content type="header" className="w-auto">{category.id}</Table.Content>
                                        <Table.Content>{category.name}</Table.Content>
                                        <Table.Content>{category.slug}</Table.Content>
                                        <Table.Content>
                                            <Dropdown>
                                                <Dropdown.Trigger>
                                                    <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                                </Dropdown.Trigger>
                                                <Dropdown.Content>
                                                    <UpdateCategory category={category} />
                                                    <DeleteDrodownLink href={route('categories.destroy', category)} />
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </Table.Content>
                                    </Table.Row>
                                )) :
                                <Table.Row>
                                    <Table.Content type="header" colSpan={"4"} className="text-center text-base text-gray-500 font-semibold italic">Tidak ada kategori</Table.Content>
                                </Table.Row>
                            }
                        </Table.Body>
                    </Table>
                    {!emptyCategory &&
                        <Pagination links={categories.links} from={categories.from} to={categories.to} total={categories.total} />
                    }
                </div>
            </ModalContext.Provider>
        </>
    )
}

Category.layout = page => <DashboardLayout children={page} header="Kategori"/>

export default Category
