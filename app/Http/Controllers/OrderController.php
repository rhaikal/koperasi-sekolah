<?php

namespace App\Http\Controllers;

use App\Http\Requests\Order\OrderRequest;
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
    public function index(Request $request)
    {
        $products = $this->productService->getProducts(6, $request);
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

    public function store(OrderRequest $request, Product $product)
    {
        $validatedData = $request->validated();

        if($validatedData['quantity'] > $product->stock) $this->exceedLimit();

        $order = $this->orderService->order($validatedData, $product);

        if($order){
            return Redirect::back()->with('alert', [
                'icon' => 'success',
                'message' => 'Berhasil memasukan barang ke keranjang'
            ]);
        } else $this->exceedLimit();
    }

    public function update(OrderRequest $request, Product $product)
    {
        $validatedData = $request->validated();

        if((int)$validatedData['quantity'] > $product->stock) $this->exceedLimit();

        $this->orderService->update($validatedData, $product);

        return Redirect::back()->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil mengubah kuantitas barang'
        ]);
    }

    public function destroy(Product $product)
    {
        $this->orderService->remove($product);

        return Redirect::back()->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil mengeluarkan barang dari keranjang'
        ]);
    }

    public function exceedLimit() {
        return Redirect::back()->with('alert', [
            'icon' => 'error',
            'message' => 'Barang yang dipesan melebihi stok yang tersedia'
        ]);
    }
}
