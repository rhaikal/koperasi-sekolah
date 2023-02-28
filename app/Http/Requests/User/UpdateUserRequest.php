<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // $this->authorize('update', $this->user);
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $rules = [
            'role' => [Rule::in(['1', '2', '3']), Rule::excludeIf(auth()->user()->role != '3')],
            'name' => 'required|string|max:255',
            'username' => ['required', Rule::unique('users', 'username')->ignore($this->user->id)],
            'email' => ['required', Rule::unique('users', 'email')->ignore($this->user->id)],
            'no_phone' => 'sometimes|regex:/\\d/|nullable'
        ];

        if(!empty($this->profile)) $rules['profile'] = 'file|image|dimensions:max_width=2000,max_height=2000|max:1000';

        return $rules;
    }
}
