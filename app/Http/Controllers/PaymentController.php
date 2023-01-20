<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class PaymentController extends Controller
{
    // private OrderService $orderService;

    // public function __construct(OrderService $orderService)
    // {
    //     $this->orderService = $orderService;
    // }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function show(Invoice $invoice)
    {
        if($invoice->order->status == '1' && $invoice->order->user_id === auth()->id()) {
            return inertia('Order/Payment/Payment', [
                'invoice' => $invoice
            ]);
        } else throw new NotFoundResourceException;
    }
}
