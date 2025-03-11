<?php
// UserService.php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function getPaginatedUsers($perPage = 10)
    {
        return User::with('roles')->latest()->paginate($perPage);
    }

    public function findUser($id)
    {
        return User::with('roles')->findOrFail($id);
    }

    public function createUser(array $data)
    {
        $data['password'] = Hash::make($data['password']);
        return User::create($data);
    }

    public function updateUser($id, array $data)
    {
        $user = User::findOrFail($id);
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }
        $user->update($data);
        return $user;
    }

    public function deleteUser($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return true;
    }
}