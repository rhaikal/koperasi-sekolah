import { primaryButtonClass } from "@/Components/Button/PrimaryButton";
import Overview from "@/Components/Overview/Overview"
import { currencyFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Head, Link } from "@inertiajs/inertia-react";
import { BsBack } from "react-icons/bs";

const ShowProduct = ({product}) => {
    return (
        <>
            <Head title={product.name} />
            <div className="m-6">
                <Link className={primaryButtonClass} href={route('products.index')}><BsBack className="mr-2" /> Back</Link>
                <Overview header={"Product Detail"}>
                    <Overview.Content image={product.image}>
                        <Overview.List header="Name">{product.name}</Overview.List>
                        <Overview.List header="Slug">{product.slug}</Overview.List>
                        <Overview.List header="Price">{currencyFormat(product.price)}</Overview.List>
                        <Overview.List header="Stock">{product.stock}</Overview.List>
                        <Overview.List header="Description">{product.description}</Overview.List>
                    </Overview.Content>
                </Overview>
            </div>
        </>
    )
}

ShowProduct.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default ShowProduct
