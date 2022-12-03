<?php

namespace App\Service;

use App\Repository\ProductRepository;

class ProductService
{
    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getProducts()
    {
        $products = $this->productRepository->getAll();

        return $products;
    }
}
