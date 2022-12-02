<?php

namespace App\Service;

use App\Repository\ItemRepository;

class ItemService
{
    private ItemRepository $itemRepository;

    public function __construct(ItemRepository $itemRepository)
    {
        $this->itemRepository = $itemRepository;
    }

    public function getItems()
    {
        $items = $this->itemRepository->getAll();

        return $items;
    }
}
