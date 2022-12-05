<?php

namespace App\Service;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use App\Repository\ProductRepository;
use Illuminate\Support\Facades\Storage;

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
        $data['image'] = $this->storeImage($data['image']);

        $product = $this->productRepository->create($data);

        return $product;
    }

    public function update(Product $product, $data)
    {
        if($data['image']){
            if($product->image){
                $this->deleteImage($product->image);
            }

            $data['image'] = $this->storeImage($data['image']);
        }

        return $this->productRepository->update($product, $data);
    }

    public function delete(Product $product)
    {
        if($product->image){
            $this->deleteImage($product->image);
        }

        return $this->productRepository->delete($product);
    }

    public function storeImage(UploadedFile $file)
    {
        $url = $file->store('/products');

        return $url;
    }

    public function deleteImage($url)
    {
        return Storage::delete($url);
    }
}
