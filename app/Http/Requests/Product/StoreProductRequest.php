<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'image' => 'required|file|image',
            'name' => 'required|string|max:50',
            'slug' => 'required|string|max:70',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|integer',
            'stock' => 'required|integer|max_digits:5',
        ];
    }
}
