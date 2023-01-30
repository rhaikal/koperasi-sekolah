<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'profile' => 'nullable|file|image|dimensions:max_width=2000,max_height=2000|max:1000',
            'name' => ['string', 'max:255'],
            'username' => ['string', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'no_phone' => ['string', 'min:10', 'max:15'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }
}
