<?php

namespace App\Service;

use App\Models\Category;
use App\Repository\CategoryRepository;

class CategoryService
{
    private CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getCategories()
    {
        $category = $this->categoryRepository->getAll();
        
        return $category;
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
