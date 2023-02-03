<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    private OrderService $orderService;
    private UserService $userService;
    private ProductService $productService;

    public function __construct(OrderService $orderService, UserService $userService, ProductService $productService,)
    {
        $this->orderService = $orderService;
        $this->userService = $userService;
        $this->productService = $productService;
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
            'products' => $this->productService->getProductsStock(5, 'asc'),
            'revenue' => $this->orderService->sumOrdersTotalPrice(),
            'member' => $this->userService->countMembers(),
            'pendingPayments' => $this->orderService->countOrdersByStatus('1'),
            'pendingPickups' => $this->orderService->countOrdersByStatus('2'),
        ]);
    }
}
