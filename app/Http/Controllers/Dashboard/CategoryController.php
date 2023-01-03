<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Category;
use App\Services\CategoryService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;

class CategoryController extends Controller
{
    private CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = $this->categoryService->getCategories();

        return inertia('Dashboard/Category/Category', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Category\StoreCategoryRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request)
    {
        $validatedData = $request->validated();

        $this->categoryService->create($validatedData);

        return Redirect::route('categories.index')->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil membuat kategori baru',
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Category\CategoryRequest  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $validatedData = $request->validated();

        $this->categoryService->update($category, $validatedData);

        return Redirect::route('categories.index')->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil mengubah kategori',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if($this->categoryService->delete($category)) {
            return Redirect::route('categories.index')->with('alert', [
                'icon' => 'success',
                'message' => 'Berhasil menghapus kategori',
            ]);
        }
    }
}
