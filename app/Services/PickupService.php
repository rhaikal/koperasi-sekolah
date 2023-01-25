<?php

namespace App\Services;

use App\Repositories\OrderRepository;
use App\Repositories\PickupRepository;

class PickupService
{
    private PickupRepository $pickupRepository;
    private OrderRepository $orderRepository;

    public function __construct(PickupRepository $pickupRepository, OrderRepository $orderRepository)
    {
        $this->pickupRepository = $pickupRepository;
        $this->orderRepository = $orderRepository;
    }

    public function pickup($order)
    {
        $processedData = [
            'order_id' => $order->id,
            'responsible_user_id' => auth()->id(),
            'picked_at' => now()->toDateString()
        ];

        $pickup = $this->pickupRepository->create($processedData);

        if($pickup){
            $this->orderRepository->update(['status' => '3'], $order);
            return $pickup;
        } else return null;
    }
}
