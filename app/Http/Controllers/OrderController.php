<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\StoreOrderRequest;
use App\Models\Product;
use Illuminate\Http\Request;
use App\Services\ProductService;
use App\Services\CategoryService;
use App\Services\OrderService;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    private ProductService $productService;
    private CategoryService $categoryService;
    private OrderService $orderService;

    public function __construct(ProductService $productService, CategoryService $categoryService, OrderService $orderService)
    {
        $this->productService = $productService;
        $this->categoryService = $categoryService;
        $this->orderService = $orderService;
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

    public function store(StoreOrderRequest $request, Product $product)
    {
        $validatedData = $request->validated();

        $order = $this->orderService->order($validatedData, $product);

        return Redirect::back();
    }

    public function destroy(Product $product)
    {
        $this->orderService->remove($product);

        return Redirect::back();
    }
}
