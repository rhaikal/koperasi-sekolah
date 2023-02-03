<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{
    public function getAll($paginate)
    {
        $orders = Order::with('invoice')->where('status', '!=', '0')->orderBy('status', 'asc')->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getAllOwn($paginate)
    {
        $orders = Order::with('invoice')->where('status', '!=', '0')->where('user_id', '=', auth()->id())->orderBy('status', 'asc')->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getById($id)
    {
        return Order::with('invoice')->find($id);
    }

    public function getInProgress()
    {
        $order = Order::where('status', '=', '0')->where('user_id', '=', auth()->id())->first();

        return $order;
    }

    public function getOwnInCheckout($paginate = null)
    {
        $orders = Order::with('invoice')->where('status', '=', '1')->where('user_id', '=', auth()->id())->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getInCheckoutExceptOwn($paginate = null)
    {
        $orders = Order::with('invoice')->where('status', '=', '1')->where('user_id', '<>', auth()->id())->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getInCheckout($paginate = null)
    {
        $orders = Order::with('invoice')->where('status', '=', '1')->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getPaid($paginate = null)
    {
        $orders = Order::with('invoice')->where('status', '=', '2')->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getDone($paginate = null)
    {
        $orders = Order::with('invoice')->where('status', '=', '3')->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function getExpired($paginate = null)
    {
        $orders = Order::with('invoice')->where('status', '=', '-')->latest();

        $orders = (!!$paginate ?
            $orders->paginate($paginate) :
            $orders->all()
        );

        return $orders;
    }

    public function countByStatus($status)
    {
        return Order::where('status', '=', $status)->count();
    }

    public function sumTotalPrice()
    {
        return Order::where('status', '>', '1')->sum('total_price');
    }

    public function limitOrders($limit = null, $offset = null)
    {
        $orders = Order::where('status', '>', '1');

        $user = auth()->user();
        if($user->role == '2') $orders->where('user_id', '!=', $user->id);
        if(!!$offset) $orders->offset($offset);
        if(!!$limit) $orders->limit($limit);

        return $orders->get();
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
