<?php

namespace App\Repositories;

use App\Models\Product;

class productRepository
{
    private $products;

    public function __construct()
    {
        $request = request();
        $this->products = Product::with('category');

        if($request->has('category')){
            $this->products = $this->products->whereHas('category',function ($query) use ($request) {
                $query->where('slug', '=', $request->input('category'));
            });
        }

        if($request->has('search')){
            $this->products = $this->products->keyword($request->input('search'));
        }

        if($request->has('sortByPrice')){
            $this->products = $this->products->orderBy('price', $request->input('sortByPrice'));
        }else if($request->has('sortByStock')){
            $this->products = $this->products->orderBy('stock', $request->input('sortByStock'));
        }

        $this->products = $this->products->latest();
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
