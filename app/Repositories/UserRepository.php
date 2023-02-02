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

    public function update($data, $user)
    {
        return $user->update($data);
    }
}
