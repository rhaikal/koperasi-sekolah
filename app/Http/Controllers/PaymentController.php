<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Redirect;

class PaymentController extends Controller
{
    private PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load('invoice');

        if($order->status == '1') {
            return inertia('Order/Payment/Payment', [
                'order' => $order
            ]);
        } else abort(404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Http\Response
     */
    public function storeCash(Order $order)
    {
        if($order->status == '1' && $order->invoice->method == 'cash'){
            $payment = $this->paymentService->cashPayment($order);

            if($payment){
                return Redirect::back()->with('alert', [
                    'icon' => 'success',
                    'message' => 'Berhasil mengkonfirmasi pembayaran',
                ]);
            }
        } else abort(404);
    }
}
