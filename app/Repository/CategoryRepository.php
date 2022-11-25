<?php

namespace App\Repository;

use App\Models\Category;

class CategoryRepository
{
    public function getAll()
    {
        $category = Category::all();

        return $category;
    }

    public function create($data)
    {
        $category = Category::create($data);

        return $category;
    }

    public function update(Category $category, $data)
    {
        $category = $category->update($data);

        return $category;
    }

    public function delete(Category $category)
    {
        return $category->delete();
    }
}
