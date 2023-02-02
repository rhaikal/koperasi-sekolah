<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

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

    public function update($data, $user)
    {
        if(!empty($data['profile'])){
            if(!empty($user->profile)) $this->deleteImage($user->profile);
            $data['profile'] = $this->storeImage($data['profile']);
        }

        return $this->userRepository->update($data, $user);
    }

    public function storeImage(UploadedFile $file)
    {
        $url = $file->store('/img/users');

        return $url;
    }

    public function deleteImage($url)
    {
        return Storage::delete($url);
    }
}
