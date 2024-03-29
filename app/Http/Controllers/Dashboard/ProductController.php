<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Product;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private ProductService $productService;
    private CategoryService $categoryService;

    public function __construct(ProductService $productService, CategoryService $categoryService)
    {
        $this->productService = $productService;
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = $this->productService->getProducts(5);
        $categories = $this->categoryService->getCategories();

        return inertia('Dashboard/Product/Product', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = $this->categoryService->getCategories();

        return inertia('Dashboard/Product/Partials/CreateProduct', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Product\StoreProductRequest;  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProductRequest $request)
    {
        $validatedData = $request->validated();

        $this->productService->create($validatedData);

        return Redirect::route('products.index')->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil menambahkan produk baru',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $Product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return inertia('Dashboard/Product/Partials/ShowProduct', [
            'product' => $product
        ]);
        // return response()->json($product);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $Product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        $categories = $this->categoryService->getCategories();

        return inertia('Dashboard/Product/Partials/UpdateProduct', [
            'categories' => $categories,
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Product\UpdateProductRequest  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $validatedData = $request->validated();

        $this->productService->update($product, $validatedData);

        return Redirect::route('products.index')->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil mengubah produk',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if($product->orders()->exists()){
            return Redirect::back()->with('alert', [
                'icon' => 'error',
                'message' => 'Produk ini sudah ada yang pesan'
            ]);
        }

        if($this->productService->delete($product))
            return Redirect::back()->with('alert', [
                'icon' => 'success',
                'message' => 'Berhasil menghapus product',
            ]);
    }
}
