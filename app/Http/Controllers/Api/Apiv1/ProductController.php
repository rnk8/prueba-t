<?php

namespace App\Http\Controllers\Api\Apiv1;

use App\Http\Controllers\Controller;

use App\Http\Requests\v1\ProductRequest;
use App\Models\Category;
use App\Models\MeasurementUnit;
use App\Models\Product;
use App\Services\ProductService;
use App\Traits\HandlesApiExceptions;
use App\Traits\HandlesInertiaExceptions;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProductController extends Controller
{

    use HandlesApiExceptions;
    use HandlesInertiaExceptions;

    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        try {
            $products = $this->productService->getPaginatedProducts();
            return Inertia::render('admin/products/index', [
                'products' => $products
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener productos: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'No se pudieron cargar los productos'
            ]);
        }
    }

    public function store(ProductRequest $request)
    {
        return $this->handleInertiaResponse(
            function () use ($request) {
                $this->productService->createProduct($request->validated());
            },
            'admin.products.index', //  ruta éxito
            'products creado con éxito', // Mensaje bien
            'No se pudo crear el products', // Mensaje error
        );
    }

    public function create()
    {
        return Inertia::render('admin/products/create', [
            'categories' => Category::all(),
            'measurementUnits' => MeasurementUnit::all(),
            'productTypes' => ['platillo' => 'Platillo', 'bebida' => 'Bebida', 'otros' => 'Otro']
        ]);
    }

    public function show()
    {
        return Inertia::render('admin/products/show');
    }
    
    public function update(ProductRequest $request, $id)
    {
        return $this->handleInertiaResponse(
            function () use ($id, $request) {
                $this->productService->updateProduct($id, $request->validated());
            },
            'admin.products.index',
            'Categoría actualizada con éxito',
            'No se pudo actualizar la categoría'
        );
    }
    public function edit($id)
    {
        $categories = Category::all();
        $measurementUnits = MeasurementUnit::all();
        $product = Product::findOrFail($id);
        return Inertia::render('admin/products/edit', [
            'product' => $product,
            'categories' => $categories,
            'measurementUnits' => $measurementUnits,
        ]);
    }

    public function destroy($id)
    {
        return $this->handleInertiaResponse(
            function () use ($id) {
                $this->productService->deleteProduct($id);
            },
            'admin.products.index',
            'Categoría eliminada con éxito',
            'No se pudo eliminar la categoría'
        );
    }
}
