<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Http\UploadedFile;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getProducts($paginate = null, $limit = null)
    {
        $products = null;
        if($paginate){
            $products = $this->productRepository->paginate($paginate);
        } else if($limit) {
            $products = $this->productRepository->limit($limit);
        } else {
            $products = $this->productRepository->getAll();
        }

        return $products;
    }

    public function getProductsStock($limit = null, $orderBy = "asc")
    {
        return $this->productRepository->orderByStock($orderBy, $limit);
    }

    public function create($data)
    {
        $data['image'] = $this->storeImage($data['image']);

        $product = $this->productRepository->create($data);

        return $product;
    }

    public function update(Product $product, $data)
    {
        if(!empty($data['image'])){
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
        $url = $file->store('/img/products');

        return $url;
    }

    public function deleteImage($url)
    {
        return Storage::delete($url);
    }
}
