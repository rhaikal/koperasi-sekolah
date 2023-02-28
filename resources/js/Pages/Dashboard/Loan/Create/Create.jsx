import DashboardLayout from "@/Layouts/DashboardLayout"
import { Head } from "@inertiajs/inertia-react";
import LoanForm from "../Partials/LoanForm";

const CreateLoan = ({users}) => {
    const handleSubmit = (form) => {
        form.post(route('loans.store'), {
            preseveState: true
        })
    }

    return (
        <>
            <Head title="Buat Pinjaman" />
            <LoanForm users={users} handleSubmit={handleSubmit} header={"Buat Pinjaman"}></LoanForm>
        </>
    )
}

CreateLoan.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default CreateLoan
