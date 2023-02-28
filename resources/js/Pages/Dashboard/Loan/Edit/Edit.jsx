import DashboardLayout from "@/Layouts/DashboardLayout"
import { Head } from "@inertiajs/inertia-react";
import LoanForm from "../Partials/LoanForm";

const UpdateLoan = ({users, loan}) => {
    const handleSubmit = (form) => {
        form.put(route('loans.update', loan), {
            preseveState: true
        })
    }

    return (
        <>
            <Head title="Update Pinjaman" />
            <LoanForm users={users} loan={loan} handleSubmit={handleSubmit} header={"Update Pinjaman"}></LoanForm>
        </>
    )
}

UpdateLoan.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default UpdateLoan
