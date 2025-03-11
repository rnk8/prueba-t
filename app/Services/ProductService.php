<?php

namespace App\Services;

use App\Models\Product;

class ProductService
{
    public function getPaginatedProducts($perPage = 10)
    {
        return Product::select([
            'id',
            'product_name',
            'description',
            'type',
            'buying_price',
            'selling_price',
            'stock',
            'category_id',
            'measurement_unit_id'
        ])
            ->with([
                'category:id,name', 
                'measurementUnit:id,name,abbreviation'
            ])
            ->latest()
            ->paginate($perPage);
    }

    public function findProduct($id)
    {
        return Product::select([
            'id',
            'product_name',
            'description',
            'type',
            'buying_price',
            'selling_price',
            'stock',
            'category_id',
            'measurement_unit_id'
        ])
            ->with([
                'category:id,name',
                'measurementUnit:id,name,abbreviation'
            ])
            ->findOrFail($id);
    }

    public function createProduct(array $data)
    {
        return Product::create([
            'product_name' => $data['product_name'],
            'description' => $data['description'],
            'type' => $data['type'],
            'buying_price' => $data['buying_price'],
            'selling_price' => $data['selling_price'],
            'stock' => $data['stock'],
            'category_id' => $data['category_id'],
            'measurement_unit_id' => $data['measurement_unit_id']
        ]);
    }

    public function updateProduct($id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function deleteProduct($id)
    {
        return Product::findOrFail($id)->delete();
    }
}
