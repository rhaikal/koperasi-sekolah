<?php

namespace App\Repositories;

use App\Models\Product;

class productRepository
{
    private $products;

    public function __construct()
    {
        $request = request();
        $this->products = Product::with('category')->latest();

        if($request->has('category')){
            $this->products = $this->products->whereHas('category',function ($query) use ($request) {
                $query->where('slug', '=', $request->input('category'));
            });
        }

        if($request->has('search')){
            $this->products = $this->products->keyword($request->input('search'));
        }
    }

    public function getAll()
    {
        $products = $this->products->all();

        return $products;
    }

    public function orderByStock($orderBy = 'asc', $limit = null)
    {
        $products = Product::orderBy('stock', $orderBy);

        if(!!$limit) $products->limit($limit);

        return $products->get();
    }

    public function paginate($paginate, $search = null)
    {
        $products = $this->products;

        return $products->paginate($paginate)->appends(request()->query());
    }

    public function limit($limit)
    {
        return Product::latest()->limit($limit)->get();
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
