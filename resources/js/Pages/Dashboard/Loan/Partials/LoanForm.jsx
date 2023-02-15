import Header from "@/Components/Auth/Header"
import PrimaryButton from "@/Components/Button/PrimaryButton"
import FloatingLabel from "@/Components/Input/FloatingLabel"
import InputError from "@/Components/Input/InputError"
import Select from "@/Components/Input/Select"
import { wrapGrid } from "animate-css-grid"
import { Link, useForm } from "@inertiajs/inertia-react"
import { useEffect, useState } from "react"
import Overview from "@/Components/Overview/Overview"
import { BsBack } from "react-icons/bs"

let options = []
export default function LoanForm({ header, users, handleSubmit }){
    const [currentUser, setCurrentUser] = useState({});
    const [selectedUser, setSelectedUser] = useState(false);

    useEffect(() => {
        const grid = document.getElementById('wrap-grid');
        wrapGrid(grid, {duration: 500})
    }, [])

    useEffect(() => {
        options = []
        users.forEach(user => {
            options.push({
                value: user.id,
                label: user.name,
            })
        })
    }, [users])

    const form = useForm({
        user_id: null,
        ammount: 0,
        term_of_payment: '',
    })

    const handleChange = (event) => {
        form.setData(event.target.name, event.target.value)
    }

    const handleSelect = (data, attributes) => {
        form.setData(attributes.name, data.value);
        setCurrentUser(users.find((value) => {
            return value.id === data.value
        }))
        setSelectedUser(true);
    }

    return (
        <div className="py-8">
            <PrimaryButton className="w-fit"><BsBack className="mr-2" /><Link href={route('loans.index')}>Back</Link></PrimaryButton>
            <div id="wrap-grid" className={`transition-all grid grid-cols-10 py-4 gap-4`}>
                <div
                    className={`grid rounded shadow-lg p-4 px-4 md:p-8 mb-6 order-last lg:order-first ${!selectedUser ? 'hidden' : 'col-span-10 lg:col-span-6' }`}
                >
                    <div>
                        <Header className="text-center">Identification</Header>
                        { selectedUser &&
                            <Overview.Content image={ window.innerWidth > 1024 ? currentUser.profile : null}>
                                <Overview.List header="Name">{currentUser.name}</Overview.List>
                                <Overview.List header="Email">{currentUser.email}</Overview.List>
                                <Overview.List header="Number Phone">{currentUser.no_phone}</Overview.List>
                            </Overview.Content>
                        }
                    </div>
                </div>
                <div className={`grid rounded shadow-lg p-4 px-4 md:p-8 mb-6 order-first lg:order-last ${!selectedUser ? 'col-span-10' : 'col-span-10 lg:col-span-4'}`}>
                    <form onSubmit={handleSubmit}>
                        <Header className="text-center">{header}</Header>
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-6">
                            <div className="col-span-6 my-1">
                                <Select
                                    name={"user_id"}
                                    placeholder="User"
                                    options={options}
                                    onChange={handleSelect}
                                    hasErrors={form.errors.user_id}
                                    defaultValue={form.data.user_id}
                                />
                                {form.hasErrors && <InputError message={form.errors.user_id} className="mt-2" />}
                            </div>

                            <div className="col-span-6 my-1">
                                <FloatingLabel
                                    id="ammount"
                                    type="text"
                                    name="ammount"
                                    placeholder="Ammount"
                                    value={form.data.ammount}
                                    handleChange={handleChange}
                                    hasErrors={form.errors.ammount}
                                />
                                {form.hasErrors && <InputError message={form.errors.ammount} className="mt-2" />}
                            </div>

                            <div className="col-span-6 my-1">
                                <FloatingLabel
                                    id="term_of_payment"
                                    type="date"
                                    name="term_of_payment"
                                    placeholder="Term Of Payment"
                                    value={form.data.term_of_payment}
                                    handleChange={handleChange}
                                    hasErrors={form.errors.term_of_payment}
                                />
                                {form.hasErrors && <InputError message={form.errors.term_of_payment} className="mt-2" />}
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <div className="inline-flex items-center w-full">
                                <PrimaryButton className="font-bold py-2 px-4 w-full justify-center">Submit</PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
