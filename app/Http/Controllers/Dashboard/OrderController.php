<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Http\Controllers\Controller;

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
        if($request->filter == 'unpaid') $orders = $this->orderService->getOrderInCheckout($paginate);
        else if($request->filter == 'paid') $orders = $this->orderService->getPaidOrders($paginate);
        else $orders = $this->orderService->getOrders($paginate, !(auth()->user()->role > '1'));

        $orders->load('user:id,name');

        return inertia('Dashboard/Order/Order', [
            'orders' => $orders
        ]);
    }
}
