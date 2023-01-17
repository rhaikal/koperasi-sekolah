<?php

namespace App\Repositories;

use App\Models\Product;

class productRepository
{
    public function getAll()
    {
        $products = Product::with('category')->all();

        return $products;
    }

    public function getByCategory($category, $paginate = null)
    {
        $products = Product::with('category')->where('category_id', '=', $category);

        if($paginate){
            $products = $products->paginate($paginate);
            $products->appends(request()->query());
        } else {
            $products = $products->get();
        }

        return $products;
    }

    public function paginate($paginate)
    {
        $products = Product::with('category')->paginate($paginate);

        return $products;
    }

    public function create($data)
    {
        $product = Product::create($data);

        return $product;
    }

    public function update(Product $product, $data)
    {
        return $product->update($data);
    }

    public function delete(Product $product)
    {
        return $product->delete();
    }
}
