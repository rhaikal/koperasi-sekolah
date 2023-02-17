<?php

namespace App\Repositories;

use App\Models\SocialAccount;

class SocialAccountRepository
{
    public function getByProvider($id, $provider)
    {
        return SocialAccount::where('provider_id', $id)->where('provider_name', $provider)->first();
    }

    public function create($data)
    {
        return SocialAccount::create($data);
    }
}
