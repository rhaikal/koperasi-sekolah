<?php

namespace App\Http\Requests\Product;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'image' => 'file|image|dimensions:max_width=2000,max_height=2000|max:1000',
            'name' => 'required|string|max:50',
            'slug' => ['required', 'string', 'max:70', Rule::unique('products', 'slug')->ignore($this->product->id)],
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|integer',
            'stock' => 'required|integer|max_digits:5',
            'description' => 'required|string|max:255',
        ];
    }
}
