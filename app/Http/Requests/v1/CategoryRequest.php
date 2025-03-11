<?php
namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $categoryId = $this->route('category') ?? $this->route('id');
        
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories')->ignore($categoryId)
            ],
            'description' => 'nullable|string',
            'parent_id' => 'nullable|exists:categories,id'
        ];
    }
}