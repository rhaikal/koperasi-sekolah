import Table from "@/Components/Card/Table/Table";
import Dropdown from "@/Components/Dropdown/Dropdown";
import Pagination from "@/Components/Pagination/Pagination";
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";

const User = ({users}) => {
    const [emptyUsers, setEmptyUsers] = useState(false);

    useEffect(() => {
      if(_.isEmpty(users?.data)){
        setEmptyUsers(true);
      }
    }, [])

    return (
        <>
            <Head title="User" />
            <div className="min-w-0 p-4 overflow-x-auto rounded-lg shadow-lg">
                <Table>
                    <Table.Head>
                        <Table.Header>Id</Table.Header>
                        <Table.Header>Gambar</Table.Header>
                        <Table.Header>Nama</Table.Header>
                        <Table.Header>Peran</Table.Header>
                        <Table.Header></Table.Header>
                    </Table.Head>
                    <Table.Body>
                        {!emptyUsers ? users.data.map((user) =>
                            <Table.Row key={user.id}>
                                <Table.Content type="header" className="w-auto">{user.id}</Table.Content>
                                <Table.Content type="image"><img src={user.profile ? "/storage/"+user.profile : "/storage/img/users/placeholder.png" } alt="test" /></Table.Content>
                                <Table.Content>{user.name}</Table.Content>
                                <Table.Content>
                                    {{
                                        '1': 'Siswa',
                                        '2': 'Anggota',
                                    }[user.role] || 'Pengurus'}
                                </Table.Content>
                                <Table.Content>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('users.show', user)}>Detail</Dropdown.Link>
                                            <Dropdown.Link href={route('users.edit', user)}>Update</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </Table.Content>
                            </Table.Row>) :
                            <Table.Row>
                                <Table.Content type="header" colSpan={"4"} className="text-center text-base text-gray-500 font-semibold italic">Tidak ada kategori</Table.Content>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>
                {!emptyUsers && <Pagination links={users.links} from={users.from} to={users.to} total={users.total} />}
            </div>
        </>
    )
}

User.layout = page => <DashboardLayout children={page} header="User"/>

export default User;
