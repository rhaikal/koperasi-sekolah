import DashboardLayout from "@/Layouts/DashboardLayout"
import ProductForm from "@/Components/Dashboard/Form/Product/ProductForm"

const UpdateProduct = ({categories, product}) => {
    const handleSubmit = (form) => {
        form.post(route('products.update', product), {
            preserveState: true
        })
    }

    return (
        <ProductForm product={product} categories={categories} handleSubmit={handleSubmit} header={"Update Produk"}></ProductForm>
    )
}

UpdateProduct.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default UpdateProduct
