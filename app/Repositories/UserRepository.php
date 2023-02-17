<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    public function getAll($paginate, $except = null, $columns = ["*"])
    {
        $users = User::query();

        if(!!$except) $users = $users->where('id', '!=', $except);

        if(!!$paginate) $users = $users->paginate($paginate, $columns);
        else $users = $users->all($columns);

        return $users;
    }

    public function getByEmail($email)
    {
        return User::where('email', $email)->first();
    }

    public function getByRole($role, $except = null, $paginate = null, $columns = ["*"])
    {

        $users = User::where('role', '=', $role);
        if(!!$except) $users = $users->where('id', '!=', $except);

        if(!!$paginate) return $users->paginate($paginate, $columns);
        return $users->get($columns);
    }

    public function countByRole($logic, $role)
    {
        return User::where('role', $logic, $role)->count();
    }

    public function create($data)
    {
        return User::create($data);
    }

    public function update($data, $user)
    {
        return $user->update($data);
    }
}
