import DashboardLayout from "@/Layouts/DashboardLayout"
import LoanForm from "../Partials/LoanForm";

const CreateLoan = ({users}) => {
    const handleSubmit = (form) => {
        console.log(form.data);
    }

    return (
        <LoanForm users={users} handleSubmit={handleSubmit} header={"Create Loan"}></LoanForm>
    )
}

CreateLoan.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default CreateLoan
