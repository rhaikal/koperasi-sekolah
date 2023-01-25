<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class PaidOrderController extends Controller
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
        $orders = $this->orderService->getPaidOrders(10);

        return inertia('Dashboard/Order/Paid/Paid', [
            'orders' => $orders
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        $this->authorize('view', $invoice);

        if($invoice->order->status == '2'){
            $invoice->load(['payment']);

            return inertia('Dashboard/Order/Paid/Detail/Detail', [
                'invoice' => $invoice,
                'user' => $invoice->order->user,
            ]);
        } else throw new NotFoundResourceException();
    }
}
