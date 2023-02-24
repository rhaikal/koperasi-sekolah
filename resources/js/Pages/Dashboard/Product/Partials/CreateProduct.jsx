import DashboardLayout from "@/Layouts/DashboardLayout"
import ProductForm from "@/Components/Dashboard/Form/Product/ProductForm"

const CreateProduct = ({categories}) => {
    const handleSubmit = (form) => {
        form.post(route('products.store', form.data), {
            preserveState: true
        })
    }

    return (
        <ProductForm categories={categories} handleSubmit={handleSubmit} header={"Buat Produk"}></ProductForm>
    )
}

CreateProduct.layout = page => <DashboardLayout children={page}></DashboardLayout>

export default CreateProduct
