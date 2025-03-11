<?php


use App\Http\Controllers\Api\Apiv1\CategoryController;
use App\Http\Controllers\Api\Apiv1\ProductController;
use App\Http\Controllers\Api\Apiv1\SaleController;
use App\Http\Controllers\Api\Apiv1\UnitController;
use App\Http\Controllers\Api\Apiv1\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('users', UserController::class);
    Route::prefix('admin')->group(function () {
        Route::resource('categories', CategoryController::class)
            ->names('admin.categories');
        Route::resource('products', ProductController::class)
            ->names('admin.products');
            Route::resource('sales', SaleController::class)
            ->names('admin.sales');
        Route::resource('units', UnitController::class)
            ->names('admin.units');
    });
});
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
