<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('description');
            $table->foreignId('category_id')->constrained();
            $table->foreignId('supplier_id')->nullable();
            $table->foreignId('measurement_unit_id')->constrained();
            $table->string('product_code')->nullable();
            $table->string('product_image')->nullable();
            $table->decimal('buying_price', 10, 2)->nullable();
            $table->decimal('selling_price', 10, 2)->nullable(); // Precio de venta al público
            $table->integer('stock')->default(0); // Stock disponible
            $table->string('type')->default('platillo'); // 'platillo' o 'bebida' u otros
            $table->date('buying_date')->nullable();
            $table->date('expire_date')->nullable();
            $table->timestamps();
        });
        // recetas (platillos e y cosas ingredientes) Todavia NO SE USA
        Schema::create('product_ingredient', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained();
            $table->foreignId('ingredient_id')->constrained('products');
            $table->integer('quantity_required');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_ingredient');
        Schema::dropIfExists('products');
    }
};
