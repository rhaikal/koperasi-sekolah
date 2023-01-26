<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Order;
use App\Models\Invoice;
use Illuminate\Http\Request;
use App\Services\OrderService;
use App\Services\PaymentService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class UnpaidOrderController extends Controller
{
    private OrderService $orderService;
    private PaymentService $paymentService;

    public function __construct(OrderService $orderService, PaymentService $paymentService)
    {
        $this->orderService = $orderService;
        $this->paymentService = $paymentService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = $this->orderService->getOrderInCheckout(10, false);

        $orders->load(['user' => function ($query) {
            $query->select("id", "name");
        }]);

        return inertia('Dashboard/Order/Unpaid/Unpaid', [
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

        $invoice->order->load('user:id,name,email,no_phone');

        return inertia('Dashboard/Order/Unpaid/Detail/Detail', [
            'invoice' => $invoice,
        ]);
    }

    public function payment(Order $order)
    {
        if($order->status == '1' && $order->invoice->method == 'cash'){
            $payment = $this->paymentService->cashPayment($order);

            if($payment){
                return Redirect::back()->with('alert', [
                    'icon' => 'success',
                    'message' => 'Berhasil mengkonfirmasi pembayaran',
                ]);
            }
        } throw new NotFoundResourceException();
    }
}
