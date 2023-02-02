import Label from "@/Components/Card/Label/Label";
import { currencyFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";
import { FaBoxes, FaMoneyCheck, FaReceipt, FaUsers } from "react-icons/fa";

const Dashboard = ({auth, revenue, member, pendingPayments, pendingPickups}) => {
    return (
        <>
            <div className={`grid gap-6 mb-8 md:grid-cols-2 ${auth.user.role == '2' ? 'xl:grid-cols-3' : 'xl:grid-cols-4'}`}>
                {auth.user.role != '2' && <Label
                    icon={
                        <FaMoneyCheck className="h-5 w-5 text-current"/>
                    }
                    iconClass="text-green-500 bg-green-100"
                    text="Revenue"
                    count={currencyFormat(revenue)}
                />}
                <Label
                    icon={
                        <FaUsers className="w-5 h-5 text-current"/>
                    }
                    iconClass="text-orange-500 bg-orange-100"
                    text="Total member"
                    count={member}
                />
                <Label
                    icon={
                        <FaReceipt className="w-5 h-5 text-current"/>
                    }
                    iconClass="text-blue-500 bg-blue-100"
                    text="Pending payments"
                    count={pendingPayments}
                />
                <Label
                    icon={
                        <FaBoxes className="w-5 h-5 text-current" />
                    }
                    iconClass="text-teal-500 bg-teal-100"
                    text="Pending pickups"
                    count={pendingPickups}
                />
            </div>
        </>
    )
}

Dashboard.layout = page => <DashboardLayout children={page} header="Dashboard"/>

export default Dashboard;
