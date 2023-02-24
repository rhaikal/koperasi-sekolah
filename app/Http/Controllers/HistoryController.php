<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\OrderService;

class HistoryController extends Controller
{
    private OrderService $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = $this->orderService->getOrders(10);

        $orders->load('invoice:order_id,method,created_at');

        return inertia('Order/History/History', [
            'orders' => $orders
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        if($order->status > 0 || $order->status == '-'){
            $this->authorize('view', $order);

            $order->load('invoice', 'user:id,name,email,no_phone');
            if($order->status == '2') $order->invoice->load('payment');
            if($order->status == '3') $order->load('pickup');

            return inertia('Order/History/Detail/Detail', [
                'order' => $order,
            ]);
        } else abort(404);
    }
}
