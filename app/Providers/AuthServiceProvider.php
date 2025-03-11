<?php
namespace App\Providers;

use App\Models\Insumo;
use App\Models\Orden;
use App\Models\Producto;
use App\Models\User;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // Si decides usar policies, se registrarían aquí
    ];

    public function boot(): void
    {
        // Registrar Gates para Productos
        Gate::define('ver-productos', function (User $user) {
            return $user->hasPermissionTo('ver productos');
        });

        Gate::define('crear-producto', function (User $user) {
            return $user->hasPermissionTo('crear productos');
        });

        Gate::define('editar-producto', function (User $user, Producto $producto) {
            return $user->hasPermissionTo('editar productos');
        });

        Gate::define('eliminar-producto', function (User $user, Producto $producto) {
            // Lógica adicional: no permitir eliminar productos que estén en órdenes activas
            return $user->hasPermissionTo('eliminar productos') && !$producto->tieneOrdenesActivas();
        });

        // Gates para Insumos
        Gate::define('ver-insumos', function (User $user) {
            return $user->hasPermissionTo('ver insumos');
        });

        Gate::define('ajustar-inventario', function (User $user, Insumo $insumo) {
            return $user->hasPermissionTo('ajustar inventario');
        });

        // Gates para Ventas
        Gate::define('crear-venta', function (User $user) {
            return $user->hasPermissionTo('crear ventas');
        });

        Gate::define('anular-venta', function (User $user, Orden $orden) {
            // Solo permitir anular ventas del mismo día y si el usuario tiene el permiso
            $esMismoDia = $orden->created_at->isToday();
            return $user->hasPermissionTo('anular ventas') && $esMismoDia;
        });

        // Gate para acceso a reportes
        Gate::define('ver-reportes', function (User $user) {
            // Solo administradores y gerentes pueden ver todos los reportes
            return $user->hasAnyRole(['administrador', 'gerente']);
        });

        // Gate para decisiones de negocio
        Gate::define('aplicar-descuento', function (User $user, $montoDescuento) {
            // Solo administrador puede aplicar descuentos mayores a $100
            if ($montoDescuento > 100) {
                return $user->hasRole('administrador');
            }
            // Gerentes pueden aplicar descuentos hasta $100
            return $user->hasAnyRole(['administrador', 'gerente']);
        });
    }
}