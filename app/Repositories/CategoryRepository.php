<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function getAll()
    {
        $categories = Category::all();

        return $categories;
    }

    public function paginate($paginate)
    {
        $categories = Category::paginate($paginate);

        return $categories;
    }

    public function create($data)
    {
        $category = Category::create($data);

        return $category;
    }

    public function update(Category $category, $data)
    {
        $category->update($data);

        return $category;
    }

    public function delete(Category $category)
    {
        return $category->delete();
    }
}
