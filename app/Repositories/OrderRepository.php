<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function getOrderInProgress()
    {
        $order = Order::where('status', '=', 0)->where('user_id', '=', auth()->id())->first();

        return $order;
    }

    public function create()
    {
        $order = Order::create([
            'user_id' => auth()->id(),
            'status' => 0,
            'total_price' => 0,
        ]);

        return $order;
    }

    public function update($data, $order)
    {
        $order->update($data);

        return $order;
    }

    public function delete($order)
    {
        $order->delete();
    }
}
