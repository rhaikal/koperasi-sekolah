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
}
