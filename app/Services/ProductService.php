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

    public function getProducts($paginate = null, $data = null)
    {
        $products = null;
        if($paginate){
            if($data->has('category')) $products = $this->productRepository->getByCategory($data->category, $paginate);
            else $products = $this->productRepository->paginate($paginate);
        } else {
            $products = $this->productRepository->getAll();
        }

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
