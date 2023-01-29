<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentNotificationRequest;
use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\Request;
use App\Services\PaymentService;
use Illuminate\Support\Facades\Redirect;
use Midtrans\Notification;
use Midtrans\Transaction;

class PaymentController extends Controller
{
    private PaymentService $paymentService;
    private OrderService $orderService;

    public function __construct(PaymentService $paymentService, OrderService $orderService)
    {
        $this->paymentService = $paymentService;
        $this->orderService = $orderService;
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
        if($order->invoice->method == 'e-wallet') $order->invoice->makeVisible('token');

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

    /**
     * Store a newly created resource in storage.
     *
     * @param App\Http\Requests\PaymentNotificationRequest $request
     * @return \Illuminate\Http\Response
     */
    public function storeEWallet(PaymentNotificationRequest $request)
    {
        $validatedData = $request->validated();

        $notification = null;
        if(!!$validatedData) $notification = Transaction::status($validatedData['notification']['transaction_id']);
        else $notification = new Notification();

        $order = $this->orderService->getOrderById((explode('-',$notification->order_id))[0]);

        if(!!$notification && $order->status == '1' && $order->invoice->method == 'e-wallet') {
            $payment = $this->paymentService->eWalletPayment($order, $notification);
            if($payment == 'success'){
                return Redirect::route('history.index')->with('alert', [
                    'icon' => 'success',
                    'message' => 'Berhasil melakukan pembayaran',
                ]);
            } else if($payment == 'expired'){
                return Redirect::route('history.index')->with('alert', [
                    'icon' => 'error',
                    'message' => 'Melebihi batas waktu pembayaran',
                ]);
            } else {
                return Redirect::back()->with('alert', [
                    'icon' => 'error',
                    'message' => 'Gagal melakukan pembayaran',
                ]);
            }
        } else abort(404);
    }
}
