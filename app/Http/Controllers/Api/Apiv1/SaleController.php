<?php

namespace App\Http\Controllers\Api\Apiv1;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Sale;
use App\Services\SaleService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class SaleController extends Controller
{
    protected $saleService;

    public function __construct(SaleService $saleService)
    {
        $this->saleService = $saleService;
    }

    public function index()
    {
        try {
            $sales = Sale::with(['user', 'products'])->latest()->paginate(10);
            return Inertia::render('admin/sales/index', [
                'sales' => $sales
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener ventas: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'No se pudieron cargar las ventas'
            ]);
        }
    }

    public function create()
    {
        try {
            $products = Product::where('stock', '>', 0)
                ->select('id', 'product_name', 'product_code', 'stock', 'selling_price')
                ->get();
            return Inertia::render('admin/sales/create', [
                'products' => $products
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al cargar productos para venta: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'No se pudieron cargar los productos'
            ]);
        }
    }
    public function show()
    {
        return Inertia::render('admin/sales/show');
    }
    

    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'location' => 'required|string'
        ]);

        try {
            $this->saleService->createSale($validated);
            return redirect()->route('admin.sales.create')->with('success', 'Venta registrada correctamente');
        } catch (\Throwable $th) {
            Log::error('Error al registrar venta: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'Error: ' . $th->getMessage()
            ]);
        }
    }
}
