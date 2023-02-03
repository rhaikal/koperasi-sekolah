import PrimaryButton from '@/Components/Button/PrimaryButton';
import Invoice from '@/Components/Invoice/Invoice';
import HomeLayout from '@/Layouts/HomeLayout';
import { Link } from '@inertiajs/inertia-react';
import { BsBack } from 'react-icons/bs';

const DetailHistory = ({order}) => {
    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <PrimaryButton className="align-top mr-3"><Link className="flex" href={route('history.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
                <div className="bg-white overflow-x-scroll shadow-sm sm:rounded-lg my-6">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <Invoice order={order} />
                    </div>
                </div>
            </div>
        </div>
    )
}

DetailHistory.layout = page => <HomeLayout auth={page.props.auth} errors={page.props.errors} children={page} />

export default DetailHistory
