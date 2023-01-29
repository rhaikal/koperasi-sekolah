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

    public function eWalletPayment($order, $notification)
    {
        if($this->isSignatureKeyVerified($order, $notification)){
            if($notification->transaction_status == 'expire'){
                $this->orderRepository->update(['status' => '-'], $order);
                return 'expired';
            }

            $fraudStatus = !empty($notification->fraud_status) ? ($notification->fraud_status == 'accept') : true;
            if($notification->status_code == 200 && $fraudStatus && $notification->transaction_status == 'settlement'){
                $this->orderRepository->update(['status' => '2'], $order);

                $processedData = [
                    'invoice_id' => $order->invoice->id,
                    'responsible_user_id' => null,
                    'payment_date' => now()
                ];

                $this->paymentRepository->create($processedData);

                return 'success';
            }

            return 'error';
        } else abort(403);
    }

    public function isSignatureKeyVerified($order, $notification)
    {
        $orderId = $order->id . '-' . $order->created_at->timestamp;
        $statusCode = $notification->status_code;
        $grossAmount = (string)$order->total_price . '.00';
        $serverKey = env('Midtrans_Server_Key');
        $input = $orderId . $statusCode . $grossAmount . $serverKey;
        return (openssl_digest($input, 'sha512') == $notification->signature_key);

    }
}
