<?php

namespace App\Service;

use Illuminate\Http\UploadedFile;
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

    public function create($data)
    {
        $data['image'] = $this->storeImage($data['image'], $data['slug']);

        $product = $this->productRepository->create($data);

        return $product;
    }

    public function storeImage(UploadedFile $file, $slug)
    {
        $url = $file->store('/products/' . $slug);

        return $url;
    }
}
