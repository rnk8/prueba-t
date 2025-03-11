<?php
// UserController.php
namespace App\Http\Controllers\Api\Apiv1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateRequest;
use App\Models\User;
use App\Services\UserService;
use App\Traits\HandlesApiExceptions;
use App\Traits\HandlesInertiaExceptions;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class UserController extends Controller
{

    use HandlesApiExceptions;
    use HandlesInertiaExceptions;
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        try {
            $users = $this->userService->getPaginatedUsers();
            return Inertia::render('admin/users/index', [
                'users' => $users
            ]);
        } catch (\Throwable $th) {
            Log::error('Error al obtener users: ' . $th->getMessage());
            return redirect()->back()->withErrors([
                'error' => 'No se pudieron cargar users'
            ]);
        }
    }

    public function store(RegisterRequest $request)
    {
        return $this->handleResponse(
            fn() => $this->userService->createUser($request->validated()),
            'user',
            201
        );
    }
    // public function store(RegisterRequest $request)
    // {
    //     return $this->handleInertiaResponse(
    //         function () use ($request) {
    //             $this->userService->createUser($request->validated());
    //         },
    //         'user.index', //  ruta éxito
    //         'Categoría creada con éxito', // Mensaje bien
    //         'No se pudo crear la categoría', // Mensaje error
    //     );
    // }
    public function create()
    {
        return Inertia::render('admin/users/create');
    }
    public function show($id)
    {
        return $this->handleResponse(
            fn() => $this->userService->findUser($id),
            'user'
        );
    }

    public function update(UpdateRequest $request, $id)
    {
        return $this->handleResponse(
            fn() => $this->userService->updateUser($id, $request->validated()),
            'user',
            message: 'Usuario Update'
        );
    }
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('admin/users/edit', ['user' => $user]);
    }
    
    // public function destroy($id)
    // {
    //     return $this->handleResponse(
    //         fn() => $this->userService->deleteUser($id),
    //         message: 'Usuario eliminado'
    //     );
    // }

    public function destroy($id)
    {
        return $this->handleInertiaResponse(
            function () use ($id) {
                $this->userService->deleteUser($id);
            },
            'admin.users.index',
            'User eliminado con éxito',
            'No se pudo eliminar la user'
        );
    }
}