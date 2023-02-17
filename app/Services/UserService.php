<?php

namespace App\Services;

use App\Notifications\SocialAccountCreated;
use Illuminate\Http\UploadedFile;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Repositories\SocialAccountRepository;
use PhpParser\Node\Expr\Cast\String_;

class UserService
{
    private UserRepository $userRepository;
    private SocialAccountRepository $socialAccountRepository;

    public function __construct(UserRepository $userRepository, SocialAccountRepository $socialAccountRepository)
    {
        $this->userRepository = $userRepository;
        $this->socialAccountRepository = $socialAccountRepository;
    }

    public function getMembers($paginate = null)
    {
        return $this->userRepository->getByRole('2', null, $paginate, ['id', 'name', 'email', 'no_phone', 'profile']);
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

    public function countMembers()
    {
        return $this->userRepository->countByRole('>', '1');
    }

    public function getOrCreateUserBySocialAccount($socialUser, $provider)
    {
        $socialAccount = $this->socialAccountRepository->getByProvider($socialUser->id, $provider);

        if($socialAccount) return $socialAccount->user;
        else {
            $user = $this->userRepository->getByEmail($socialUser->email);

            if(!$user) {
                $password = str()->random(8);
                $user = $this->userRepository->create([
                    'role' => '1',
                    'username' => $socialUser->getNickname() ?? $this->getNicknameByName($socialUser->getName()),
                    'name' => $socialUser->getName(),
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make($password),
                ]);

                $user->notify(new SocialAccountCreated($password));
            }

            $this->socialAccountRepository->create([
                'user_id' => $user->id,
                'provider_id' => $socialUser->getId(),
                'provider_name' => $provider
            ]);

            return $user;
        }
    }

    public function update($data, $user)
    {
        if(!empty($data['profile'])){
            if(!empty($user->profile)) $this->deleteImage($user->profile);
            $data['profile'] = $this->storeImage($data['profile']);
        }

        return $this->userRepository->update($data, $user);
    }

    public function getNicknameByName($name)
    {
        $nickname = strtolower($name);
        $nickname = str_replace(' ', '' , $nickname);
        $nickname = $nickname . rand(1, 999);

        return $nickname;
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
