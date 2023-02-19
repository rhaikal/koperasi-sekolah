<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\LoanService;
use App\Services\OrderService;
use App\Services\ProductService;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    private OrderService $orderService;
    private LoanService $loanService;
    private ProductService $productService;

    public function __construct(OrderService $orderService, LoanService $loanService, ProductService $productService,)
    {
        $this->orderService = $orderService;
        $this->loanService = $loanService;
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
            'loans' => $this->loanService->getLoans(5),
            'pendingPayments' => $this->orderService->countOrdersByStatus('1'),
            'pendingPickups' => $this->orderService->countOrdersByStatus('2'),
            'revenueChart' => $this->orderService->getRevenueOrdersPerMonth(),
        ]);
    }
}
