import PrimaryButton from "@/Components/Button/PrimaryButton";
import Overview from "@/Components/Overview/Overview"
import { currencyFormat } from "@/helper";
import DashboardLayout from "@/Layouts/DashboardLayout"
import { Link } from "@inertiajs/inertia-react";
import { BsBack } from "react-icons/bs";

const ShowProduct = ({product}) => {
    return (
        <div className="m-6">
            <PrimaryButton><Link className="w-full flex" href={route('products.index')}><BsBack className="mr-2" /> Back</Link></PrimaryButton>
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
    )
}

ShowProduct.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default ShowProduct
