<?php

namespace App\Http\Controllers\Dashboard;

use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Order;
use App\Services\PickupService;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class PaidOrderController extends Controller
{
    private OrderService $orderService;
    private PickupService $pickupService;

    public function __construct(OrderService $orderService, PickupService $pickupService)
    {
        $this->orderService = $orderService;
        $this->pickupService = $pickupService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = $this->orderService->getPaidOrders(10);

        $orders->load(['user' => function ($query) {
            $query->select("id", "name");
        }]);

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

            $invoice->order->load('user:id,name,email,no_phone');

            return inertia('Dashboard/Order/Paid/Detail/Detail', [
                'invoice' => $invoice,
                'user' => $invoice->order->user,
            ]);
        } else throw new NotFoundResourceException();
    }

    public function pickup(Order $order)
    {
        if($order->status == '2'){
            $this->pickupService->pickup($order);

            return Redirect::back()->with('alert', [
                'icon' => 'success',
                'message' => 'Berhasil mengkonfirmasi pengambilan',
            ]);
        } else throw new NotFoundResourceException();
    }
}
