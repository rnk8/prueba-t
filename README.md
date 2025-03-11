# Gestión de Productos, Categorías y Ventas

Aplicación Laravel para gestión de productos, categorías y ventas con cálculos automáticos.

## Características

- 📦 Gestión de categorías (CRUD completo)
- 🛒 Registro de productos con detalles completos
- 💰 Sistema de ventas con cálculo automático de totales
- 🔍 Navegación intuitiva

## Requisitos

- PHP 8.2+
- Composer
- Node.js/npm
- MySQL/PostgreSQL

## Instalación

git clone [URL_DEL_REPOSITORIO]

cd [NOMBRE_DEL_DIRECTORIO]

composer install

npm install

cp .env.example .env

php artisan key:generate

## Configurar .env:
DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_DATABASE=nombre_db

DB_USERNAME=usuario

DB_PASSWORD=contraseña

### Ejecutar migraciones (opcional con datos demo)
php artisan migrate:fresh --seed

npm run dev

php artisan serve --port=8000

Credenciales Admin

Usuario: admin@example.com

Contraseña: password


# Uso
Categorías: Crear/Editar desde el menú

Productos: Registrar con categoría y precios

Ventas: Seleccionar productos y cantidades

## Tecnologías
Laravel 12

Inertia.js v2

MySQL


#### Contribuir
Haz fork del repositorio

Crea rama: git checkout -b feature/nueva-funcionalidad

Envía PR con descripción detallada

👉 Nota: Reemplaza [URL_DEL_REPOSITORIO], [NOMBRE_DEL_DIRECTORIO] y las credenciales de la base de datos con tu información real.

RvS
