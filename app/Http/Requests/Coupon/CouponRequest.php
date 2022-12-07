<?php

namespace App\Http\Requests\Coupon;

use Illuminate\Foundation\Http\FormRequest;

class CouponRequest extends FormRequest
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
            'code' => 'required|string|size:6',
            'discount' => 'required|integer|max:100|min:0',
            'max_used' => 'required|integer|max_digits:2',
            'description' => 'required|max:255',
            'expired_at' => 'required|date_format:Y-m-d\\TH:i|after:now',
        ];
    }
}
