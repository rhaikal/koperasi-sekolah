<?php

namespace App\Http\Controllers\Dashboard;

use App\Models\Order;
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
        $orders = $this->orderService->getOrderInCheckout(5, false);

        return inertia('Dashboard/Order/Unpaid/Unpaid', [
            'orders' => $orders
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
