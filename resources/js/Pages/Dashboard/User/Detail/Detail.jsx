import PrimaryButton from "@/Components/Button/PrimaryButton";
import Overview from "@/Components/Overview/Overview"
import { currencyFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react";
import { BsBack } from "react-icons/bs";

const DetailUser = ({user}) => {
    return (
        <div className="m-6">
            <PrimaryButton><Link className="w-full flex" href={route('users.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
            <Overview header={"User Detail"}>
                <Overview.Content image={(user.profile !== undefined && user.profile !== null) ? user.profile : "/img/users/placeholder.png" }>
                    <Overview.List header="Role">
                        {{
                            '1': 'Siswa',
                            '2': 'Anggota',
                        }[user.role] || 'Pengurus'}
                    </Overview.List>
                    <Overview.List header="Name">{user.name}</Overview.List>
                    <Overview.List header="Username">{user.username}</Overview.List>
                    <Overview.List header="Email">{user.email}</Overview.List>
                    <Overview.List header="Number Phone">{user.no_phone}</Overview.List>
                </Overview.Content>
            </Overview>
        </div>
    )
}

DetailUser.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default DetailUser
