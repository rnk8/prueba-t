<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'quantity',
        'operation_type',
        'reference_id',
        'reference_type',
        'unit_price',
        'notes'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    //  polimorfico 
    public function reference()
    {
        return $this->morphTo();
    }
}