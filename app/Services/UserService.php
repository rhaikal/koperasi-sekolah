<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUsers($paginate = null)
    {
        $user = auth()->user();

        $users = null;
        $columns = ['id', 'profile', 'name', 'role'];
        if($user->role == '2') $users = $this->userRepository->getByRole('2', $user->id, $paginate, $columns);
        else $users = $this->userRepository->getAll($paginate, $user->id, $columns);

        return $users;
    }
}
