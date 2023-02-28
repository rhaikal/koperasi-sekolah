import DashboardLayout from "@/Layouts/DashboardLayout"
import ProductForm from "@/Components/Dashboard/Form/Product/ProductForm"
import { Head } from "@inertiajs/inertia-react"

const UpdateProduct = ({categories, product}) => {
    const handleSubmit = (form) => {
        form.post(route('products.update', product), {
            preserveState: true
        })
    }

    return (
        <>
            <Head title="Update Produk" />
            <ProductForm product={product} categories={categories} handleSubmit={handleSubmit} header={"Update Produk"}></ProductForm>
        </>
    )
}

UpdateProduct.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default UpdateProduct
