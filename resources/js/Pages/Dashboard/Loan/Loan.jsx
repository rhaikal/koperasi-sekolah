import PrimaryButton from "@/Components/Button/PrimaryButton"
import Table from "@/Components/Card/Table/Table"
import Dropdown from "@/Components/Dropdown/Dropdown"
import Pagination from "@/Components/Pagination/Pagination"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react"
import { SlOptionsVertical } from "react-icons/sl"

const Loan = ({ loans }) => {
    return (
        <div className="min-w-0 p-4 pt-8 overflow-x-auto rounded-lg shadow-lg">
            <div className="flex justify-between my-4">
                <div className="w-80">
                    <input type="search" id="search-dropdown" className="w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search loans by id or borrower name" />
                </div>
                <PrimaryButton className="text-gray-500 h-fit self-center"><Link href={route('loans.create')}>Create Loan</Link></PrimaryButton>
            </div>
            <Table>
                <Table.Head>
                    <Table.Header>Id</Table.Header>
                    <Table.Header>Borrower Name</Table.Header>
                    <Table.Header>Ammount</Table.Header>
                    <Table.Header></Table.Header>
                </Table.Head>
                <Table.Body>
                    {!_.isEmpty(loans?.data) ? loans.data.map((loan) => (
                        <Table.Row key={loan.id}>
                            <Table.Content>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={'#'}>Detail</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </Table.Content>
                        </Table.Row>
                    )):
                        <Table.Row>
                            <Table.Content type="header" colSpan={"4"} className="text-center text-base text-gray-500 font-semibold italic">Loans Not Found</Table.Content>
                        </Table.Row>
                    }
                </Table.Body>
            </Table>
            {!_.isEmpty(loans?.data) && <Pagination links={loans.links} from={loans.from} to={loans.to} total={loans.total} />}
        </div>
    )
}

Loan.layout = page => <DashboardLayout children={page} header="Loan" />

export default Loan
