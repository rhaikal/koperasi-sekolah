<?php

namespace App\Repository;

use App\Models\Product;

class productRepository
{
    public function getAll()
    {
        $products = Product::all();

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
}
