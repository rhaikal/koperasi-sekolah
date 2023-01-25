<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use App\Repositories\PaymentRepository;

class PaymentService
{
    private PaymentRepository $paymentRepository;
    private OrderRepository $orderRepository;

    public function __construct(PaymentRepository $paymentRepository, OrderRepository $orderRepository)
    {
        $this->paymentRepository = $paymentRepository;
        $this->orderRepository = $orderRepository;
    }

    public function cashPayment($order)
    {
        $processedData = [
            'invoice_id' => $order->invoice->id,
            'responsible_user_id' => auth()->id(),
            'payment_date' => now()
        ];

        $payment = $this->paymentRepository->create($processedData);

        if($payment){
            $this->orderRepository->update(['status' => '2'], $order);
            return $payment;
        } else return null;
    }
}
