<?php

namespace App\Repositories;

use App\Models\Pickup;

class PickupRepository
{
    public function create($data)
    {
        return Pickup::create($data);
    }
}
