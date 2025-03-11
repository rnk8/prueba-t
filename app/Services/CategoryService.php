<?php
namespace App\Services;

use App\Models\Category;

class CategoryService
{
    public function getAllCategories($perPage = 10)
    {
        return Category::latest()->paginate($perPage);
    }

    public function getCategoryById($id)
    {
        return Category::findOrFail($id);
    }

    public function createCategory(array $data)
    {
        $category = Category::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? '',
            'parent_id' => $data['parent_id'] ?? null
        ]);
        return $category;
    }


    // CategoryService.php
    public function updateCategory($id, array $data)
    {
        $category = Category::findOrFail($id);
        
        $category->update([
            'name' => $data['name'],
            'description' => $data['description'] ?? $category->description,
            'parent_id' => $data['parent_id'] ?? $category->parent_id
        ]);
    
        return $category->load(['parent', 'children']);
    }
    public function deleteCategory($id)
    {
        return Category::findOrFail($id)->delete();
    }
}
