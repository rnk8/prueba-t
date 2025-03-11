<?php

namespace App\Http\Controllers;

abstract class Controller
{
    //
}

// 7. Ejemplo de uso en controladores
// app/Http/Controllers/ProductoController.php
namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:ver productos')->only('index', 'show');
        $this->middleware('permission:crear productos')->only('create', 'store');
        $this->middleware('permission:editar productos')->only('edit', 'update');
        $this->middleware('permission:eliminar productos')->only('destroy');
    }

    public function index()
    {
        // Código para listar productos
    }

    // Resto de métodos...
}