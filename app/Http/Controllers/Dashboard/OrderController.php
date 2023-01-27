<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Models\Order;

class OrderController extends Controller
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
    public function index(Request $request)
    {
        $orders = null;
        $paginate = 10;
        if($request->filter == 'done') $orders = $this->orderService->getDoneOrders($paginate);
        else if($request->filter == 'expired') $orders = $this->orderService->getExpiredOrders($paginate);
        else if($request->filter == 'unpaid') $orders = $this->orderService->getOrderInCheckout($paginate, false);
        else if($request->filter == 'paid') $orders = $this->orderService->getPaidOrders($paginate);
        else $orders = $this->orderService->getOrders($paginate, !(auth()->user()->role > '1'));

        $orders->load('user:id,name');

        return inertia('Dashboard/Order/Order', [
            'orders' => $orders
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        if($order->status > 0){
            $this->authorize('view', $order);

            $order->load('invoice', 'user:id,name,email,no_phone');
            if($order->status == '2') $order->invoice->load('payment');
            if($order->status == '3') $order->load('pickup');

            return inertia('Dashboard/Order/Detail/Detail', [
                'order' => $order,
            ]);
        } else abort(404);
    }
}
