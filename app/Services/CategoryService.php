<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\CategoryRepository;

class CategoryService
{
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getCategories($paginate = null)
    {
        $categories = null;
        if($paginate) {
            $categories = $this->categoryRepository->paginate($paginate);
        } else {
            $categories = $this->categoryRepository->getAll();
        }

        return $categories;
    }

    public function create($data)
    {
        $category = $this->categoryRepository->create($data);

        return $category;
    }

    public function update(Category $category, $data)
    {
        $category = $this->categoryRepository->update($category, $data);

        return $category;
    }

    public function delete(Category $category)
    {
        return $this->categoryRepository->delete($category);
    }
}
