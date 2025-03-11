<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_name',
        'description',
        'category_id',
        'measurement_unit_id',
        'product_code',
        'buying_price',
        'selling_price', // Precio 
        'stock',
        'expire_date'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function measurementUnit()
    {
        return $this->belongsTo(MeasurementUnit::class);
    }
    public function sales()
    {
        return $this->belongsToMany(Sale::class)
            ->withPivot('quantity', 'unit_price')
            ->withTimestamps();
    }
    public function inventories()
    {
        return $this->hasMany(Inventory::class);
    }

    //Todavia NO SE USA
    public function ingredients()
    {
        return $this->belongsToMany(Product::class, 'product_ingredient')
            ->withPivot('quantity_required');
    }
    public function storage()
    {
        return $this->hasMany(Storage::class);
    }

}
