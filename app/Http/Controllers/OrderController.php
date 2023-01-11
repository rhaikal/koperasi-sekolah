<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\CategoryService;

class OrderController extends Controller
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
        $products = $this->productService->getProducts(6);
        $categories = $this->categoryService->getCategories();

        return inertia('Product/Shop/Shop', [
            'products' => $products,
            'categories' => $categories
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
        return inertia('Product/Detail/Detail', [
            'product' => $product
        ]);
    }
}
