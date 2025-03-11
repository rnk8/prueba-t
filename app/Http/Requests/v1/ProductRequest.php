<?php

namespace App\Http\Requests\v1;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'product_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:platillo,bebida,otro',
            'buying_price' => 'required|numeric|min:0',
            'selling_price' => 'required|numeric|min:0|gt:buying_price',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'measurement_unit_id' => 'required|exists:measurement_units,id'
        ];
    }
}
