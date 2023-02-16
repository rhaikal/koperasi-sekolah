import DashboardLayout from "@/Layouts/DashboardLayout"
import LoanForm from "../Partials/LoanForm";

const UpdateLoan = ({users, loan}) => {
    const handleSubmit = (form) => {
        form.put(route('loans.update', loan), {
            preseveState: true
        })
    }

    return (
        <LoanForm users={users} loan={loan} handleSubmit={handleSubmit} header={"Update Loan"}></LoanForm>
    )
}

UpdateLoan.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default UpdateLoan
