<?php

namespace App\Repositories;

class CartRepository
{
    public function get($product, $order)
    {
        $cart = $order->products->find($product->id)->pivot ?? null;

        return $cart;
    }

    public function getTotalPrice($order)
    {
        $total = $order->products->sum('pivot.subtotal_price');

        return $total;
    }

    public function sync($data, $order)
    {
        $order->products()->syncWithoutDetaching($data);
    }
}
