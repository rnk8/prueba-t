<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
   use HasFactory;
   protected $fillable = [
      'name',
      'slug', //lo que viene en el enlace: Bebida Carbonatada = bebida-carbonatada
      'description',
      'parent_id', // si yo quiero poner su padre
   ];
   protected static function boot()
   {
      parent::boot();

      static::creating(function ($category) {
         $category->slug = Str::slug($category->name); // Convierte "Mi Categoría" -> "mi-categoria"
      });

      static::updating(function ($category) {
         if ($category->isDirty('name')) { // Si cambia el nombre, se actualiza el slug
            $category->slug = Str::slug($category->name);
         }
      });
   }
   public function getRouteKeyName()
   {
      return 'slug';
   }

   public function parent()
   {
      return $this->belongsTo(Category::class, 'parent_id');
   }

   // Relación con las categorías hijas
   public function children()
   {
      return $this->hasMany(Category::class, 'parent_id');
   }

   public function products()
   {
      return $this->hasMany(Product::class);
   }
}
