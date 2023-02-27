import { primaryButtonClass } from "@/Components/Button/PrimaryButton"
import Table from "@/Components/Card/Table/Table"
import DeleteDrodownLink from "@/Components/Dashboard/Form/DeleteDropdownLink"
import Dropdown from "@/Components/Dropdown/Dropdown"
import ExportForm from "@/Components/Form/ExportForm"
import Pagination from "@/Components/Pagination/Pagination"
import { currencyFormat, dateFormat } from "@/helper"
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Inertia } from "@inertiajs/inertia"
import { Head, Link } from "@inertiajs/inertia-react"
import { useEffect, useState } from "react"
import { SlOptionsVertical } from "react-icons/sl"

const Loan = ({ loans, query, auth }) => {
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [emptyLoans, setEmptyLoans] = useState(false)

    const handleSearch = _.debounce((e) => {
        if(e.target.value) Inertia.visit(route('loans.index'), {only: ['loans', 'query'], data: {search: e.target.value}})
        else Inertia.visit(route('loans.index'), {only: ['loans', 'query']})
    }, 1000)

    const handleStartDate = (newValue) => {
        setStartDate(newValue);
        if(startDate == endDate || newValue > endDate) setEndDate(newValue);
    }

    const handleEndDate = (newValue) => {
        setEndDate(newValue);
        if(startDate == endDate && startDate == null || endDate == null) setStartDate(newValue);
    }

    useEffect(() => {
      if(_.isEmpty(loans?.data))
        setEmptyLoans(true);
    }, [])

    return (
        <>
            <Head title="Pinjaman" />
            {auth.user.role > 2 && <ExportForm
                href={route('exported.loans')}
                className="mb-2"
                valueStartDate={startDate}
                handleStartDate={handleStartDate}
                valueEndDate={endDate}
                handleEndDate={handleEndDate}
                disabled={emptyLoans}
            />}
            <div className="min-w-0 p-4 pt-2 overflow-x-auto rounded-lg shadow-lg">
                <div className="flex justify-between my-4">
                    <div className="w-96">
                        <input type="search" onChange={handleSearch} defaultValue={query.search} id="search-dropdown" className="w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder={`Cari pinjaman berdasarkan id ${auth.user.role != 2 ? 'atau nama peminjam' : ''}`} />
                    </div>
                    {auth.user.role != 2 && <Link className={primaryButtonClass + ' text-gray-500 h-fit self-center'} href={route('loans.create')}>Buat Pinjaman</Link>}
                </div>
                <Table>
                    <Table.Head>
                        <Table.Header>Id</Table.Header>
                        <Table.Header>Nama Peminjam</Table.Header>
                        <Table.Header>Jumlah</Table.Header>
                        <Table.Header>Tanggal Meminjam</Table.Header>
                        <Table.Header></Table.Header>
                    </Table.Head>
                    <Table.Body>
                        {!_.isEmpty(loans?.data) ? loans.data.map((loan) => (
                            <Table.Row key={loan.id}>
                                <Table.Content type="header" className="w-auto">{loan.id}</Table.Content>
                                <Table.Content>{loan.user.name}</Table.Content>
                                <Table.Content>{currencyFormat(loan.ammount)}</Table.Content>
                                <Table.Content>{dateFormat(loan.created_at)}</Table.Content>
                                <Table.Content>
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <SlOptionsVertical className="float-right hover:cursor-pointer" />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content>
                                            <Dropdown.Link href={route('loans.show', loan)}>Detail</Dropdown.Link>
                                            {auth.user.role != 2 &&
                                                <>
                                                    <Dropdown.Link href={route('loans.edit', loan)}>Update</Dropdown.Link>
                                                    <DeleteDrodownLink href={route('loans.destroy', loan)} />
                                                </>
                                            }
                                        </Dropdown.Content>
                                    </Dropdown>
                                </Table.Content>
                            </Table.Row>
                        )):
                            <Table.Row>
                                <Table.Content type="header" colSpan={"4"} className="text-center text-base text-gray-500 font-semibold italic">Tidak ada pinjaman</Table.Content>
                            </Table.Row>
                        }
                    </Table.Body>
                </Table>
                {!_.isEmpty(loans?.data) && <Pagination links={loans.links} from={loans.from} to={loans.to} total={loans.total} />}
            </div>
        </>
    )
}

Loan.layout = page => <DashboardLayout children={page} header="Pinjaman" />

export default Loan
