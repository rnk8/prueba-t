<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Resetear roles y permisos en caché
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos para insumos
        Permission::create(['name' => 'ver insumos']);
        Permission::create(['name' => 'crear insumos']);
        Permission::create(['name' => 'editar insumos']);
        Permission::create(['name' => 'eliminar insumos']);

        // Crear permisos para productos
        Permission::create(['name' => 'ver productos']);
        Permission::create(['name' => 'crear productos']);
        Permission::create(['name' => 'editar productos']);
        Permission::create(['name' => 'eliminar productos']);

        // Crear permisos para compras
        Permission::create(['name' => 'ver compras']);
        Permission::create(['name' => 'crear compras']);
        Permission::create(['name' => 'editar compras']);
        Permission::create(['name' => 'eliminar compras']);

        // Crear permisos para ventas
        Permission::create(['name' => 'ver ventas']);
        Permission::create(['name' => 'crear ventas']);
        Permission::create(['name' => 'editar ventas']);
        Permission::create(['name' => 'eliminar ventas']);
        Permission::create(['name' => 'anular ventas']);

        // Crear permisos para inventario
        Permission::create(['name' => 'ver inventario']);
        Permission::create(['name' => 'ajustar inventario']);

        // Crear permisos para reportes
        Permission::create(['name' => 'ver reportes']);

        // Crear permisos para usuarios
        Permission::create(['name' => 'ver usuarios']);
        Permission::create(['name' => 'crear usuarios']);
        Permission::create(['name' => 'editar usuarios']);
        Permission::create(['name' => 'eliminar usuarios']);

        // Crear roles y asignar permisos
        $adminRole = Role::create(['name' => 'administrador']);
        // El administrador tiene todos los permisos
        $adminRole->givePermissionTo(Permission::all());

        // Rol para gerente
        $gerenteRole = Role::create(['name' => 'gerente']);
        $gerenteRole->givePermissionTo([
            'ver insumos', 'crear insumos', 'editar insumos',
            'ver productos', 'crear productos', 'editar productos',
            'ver compras', 'crear compras', 'editar compras',
            'ver ventas', 'crear ventas', 'editar ventas', 'anular ventas',
            'ver inventario', 'ajustar inventario',
            'ver reportes',
            'ver usuarios'
        ]);

        // Rol para cajero
        $cajeroRole = Role::create(['name' => 'cajero']);
        $cajeroRole->givePermissionTo([
            'ver productos',
            'ver ventas', 'crear ventas',
            'ver inventario'
        ]);

        // Rol para mesero
        $meseroRole = Role::create(['name' => 'mesero']);
        $meseroRole->givePermissionTo([
            'ver productos',
            'ver ventas', 'crear ventas'
        ]);

        // Rol para cocinero/bartender
        $cocineroBartenderRole = Role::create(['name' => 'cocinero_bartender']);
        $cocineroBartenderRole->givePermissionTo([
            'ver productos',
            'ver insumos',
            'ver inventario'
        ]);

        // Crear usuario administrador de ejemplo
        $user = \App\Models\User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole('administrador');
    }
}

