<?php

namespace App\Repository;

use App\Models\Item;

class ItemRepository
{
    public function getAll()
    {
        $item = Item::all();

        return $item;
    }
}
