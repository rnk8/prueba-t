<?php
namespace App\Http\Controllers\Api\Apiv1;

use App\Http\Controllers\Controller;

use App\Http\Requests\v1\CategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use App\Traits\HandlesApiExceptions;
use App\Traits\HandlesInertiaExceptions;

use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CategoryController extends Controller
{
    use HandlesApiExceptions;
    use HandlesInertiaExceptions;

    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        try {
            $categories = $this->categoryService->getAllCategories();
            return Inertia::render('admin/categories/index', [
                'categories' => $categories
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener categorías: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'No se pudieron cargar las categorías'
            ]);
        }
    }

    public function store(CategoryRequest $request)
    {
        return $this->handleInertiaResponse(
            function () use ($request) {
                $this->categoryService->createCategory($request->validated());
            },
            'admin.categories.index', //  ruta éxito
            'Categoría creada con éxito', // Mensaje bien
            'No se pudo crear la categoría', // Mensaje error
        );
    }

    public function create()
    {
        $categories = Category::all(); 
        return Inertia::render('admin/categories/create', [
            'categories' => $categories
        ]);
    }
    

    public function show($id)
    {
        try {
            $category = $this->categoryService->getCategoryById($id);
            return Inertia::render('admin/categories/show', [
                'category' => $category
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al mostrar categoría: ' . $th->getMessage());
            return redirect()->back()->with('error', 'No se pudo cargar la categoría');
        }
    }

    public function update(CategoryRequest $request, $id)
    {
        return $this->handleInertiaResponse(
            function () use ($id, $request) {
                $this->categoryService->updateCategory($id, $request->validated());
            },
            'admin.categories.index',
            'Categoría actualizada con éxito',
            'No se pudo actualizar la categoría'
        );
    }
    public function edit(Category $category)
    {
        return Inertia::render('admin/categories/edit', ['category' => $category]);
    }

    public function destroy($id)
    {
        return $this->handleInertiaResponse(
            function () use ($id) {
                $this->categoryService->deleteCategory($id);
            },
            'admin.categories.index',
            'Categoría eliminada con éxito',
            'No se pudo eliminar la categoría'
        );
    }
}