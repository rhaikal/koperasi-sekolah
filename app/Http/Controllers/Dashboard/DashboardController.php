<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Services\UserService;

class DashboardController extends Controller
{
    private OrderService $orderService;
    private UserService $userService;

    public function __construct(OrderService $orderService, UserService $userService, )
    {
        $this->orderService = $orderService;
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = $this->orderService->getRecentOrders(5);
        $orders->load('user:id,name', 'invoice');

        return inertia('Dashboard/Dashboard', [
            'orders' => $orders,
            'revenue' => $this->orderService->sumOrdersTotalPrice(),
            'member' => $this->userService->countMembers(),
            'pendingPayments' => $this->orderService->countOrdersByStatus('1'),
            'pendingPickups' => $this->orderService->countOrdersByStatus('2'),
        ]);
    }
}
