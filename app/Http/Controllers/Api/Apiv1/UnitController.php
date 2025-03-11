<?php

namespace App\Http\Controllers\Api\Apiv1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\UnitRequest;
use App\Models\MeasurementUnit;
use App\Services\UnitService;
use App\Traits\HandlesApiExceptions;
use App\Traits\HandlesInertiaExceptions;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UnitController extends Controller
{
    use HandlesApiExceptions;
    use HandlesInertiaExceptions;

    protected $unitService;

    public function __construct(UnitService $unitService)
    {
        $this->unitService = $unitService;
    }

    public function index()
    {
        try {
            $units = $this->unitService->getPaginatedUnits();
            return Inertia::render('admin/units/index', [
                'units' => $units
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener categorías: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'No se pudieron cargar las categorías'
            ]);
        }
    }

    public function store(UnitRequest $request)
    {
        return $this->handleInertiaResponse(
            function () use ($request) {
                $this->unitService->createUnit($request->validated());
            },
            'admin.units.index', //  ruta éxito
            'Categoría creada con éxito', // Mensaje bien
            'No se pudo crear la categoría', // Mensaje error
        );
    }

    public function create()
    {
        return Inertia::render('admin/units/create');
    }

    public function show($id): JsonResponse
    {
        return $this->handleResponse(
            fn() => $this->unitService->getUnitById($id),
            'unit'
        );
    }

    public function update(UnitRequest $request, $id)
    {
        return $this->handleInertiaResponse(
            function () use ($id, $request) {
                $this->unitService->updateUnit($id, $request->validated());
            },
            'admin.units.index',
            'Categoría actualizada con éxito',
            'No se pudo actualizar la categoría'
        );
    }
    public function edit(MeasurementUnit $unit)
    {
        return Inertia::render('admin/units/edit', ['unit' => $unit]);
    }

    public function destroy($id)
    {
        return $this->handleInertiaResponse(
            function () use ($id) {
                $this->unitService->deleteUnit($id);
            },
            'admin.products.index',
            'Categoría eliminada con éxito',
            'No se pudo eliminar la categoría'
        );
    }
}
