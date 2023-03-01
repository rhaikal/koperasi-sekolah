<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReportRequest extends FormRequest
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
            'startDate' => 'date|nullable',
            'endDate' => 'date|after_or_equal:startDate|nullable',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if(!!$this->startDate || !!$this->endDate)
            $this->merge([
                'startDate' => date_create_from_format("d/m/Y", $this->startDate)->format('Y-m-d'),
                'endDate' => date_create_from_format("d/m/Y", $this->endDate)->format('Y-m-d')
            ]);
    }
}
