import { primaryButtonClass } from "@/Components/Button/PrimaryButton";
import Overview from "@/Components/Overview/Overview"
import { currencyFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Head, Link } from "@inertiajs/inertia-react";
import { BsBack } from "react-icons/bs";

const DetailUser = ({user}) => {
    return (
        <>
            <Head title={user.name} />
            <div className="m-6">
                <Link className={primaryButtonClass} href={route('users.index')}><BsBack className="mr-2" /> Kembali</Link>
                <Overview header={"User Detail"}>
                    <Overview.Content image={(user.profile !== undefined && user.profile !== null) ? user.profile : "/img/users/placeholder.png" }>
                        <Overview.List header="Role">
                            {{
                                '1': 'Siswa',
                                '2': 'Anggota',
                            }[user.role] || 'Pengurus'}
                        </Overview.List>
                        <Overview.List header="Nama">{user.name}</Overview.List>
                        <Overview.List header="Username">{user.username}</Overview.List>
                        <Overview.List header="Email">{user.email}</Overview.List>
                        <Overview.List header="Nomor Telepon">{user.no_phone}</Overview.List>
                    </Overview.Content>
                </Overview>
            </div>
        </>
    )
}

DetailUser.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default DetailUser
