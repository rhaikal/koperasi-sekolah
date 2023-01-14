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

    public function hasCart($order)
    {
        $count = $order->products()->exists();

        return $count;
    }

    public function sync($data, $order)
    {
        $order->products()->syncWithoutDetaching($data);
        $order->refresh();
    }

    public function detach($data, $order)
    {
        $order->products()->detach([$data]);
        $order->refresh();
    }
}
