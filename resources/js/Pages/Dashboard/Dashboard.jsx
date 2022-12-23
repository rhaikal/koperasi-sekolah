import DashboardLayout from "@/Layouts/DashboardLayout";
import React from "react";

const Dashboard = () => {
    return (
        <></>
    )
}

Dashboard.layout = page => <DashboardLayout children={page} header="Dashboard" user={page.props.auth.user} />

export default Dashboard;
