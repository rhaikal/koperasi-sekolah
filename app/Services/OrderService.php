<?php

namespace App\Services;

use App\Repositories\CartRepository;
use App\Repositories\OrderRepository;

class OrderService
{
    private OrderRepository $orderRepository;
    private CartRepository $cartRepository;

    public function __construct(OrderRepository $orderRepository, CartRepository $cartRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->cartRepository = $cartRepository;
    }

    public function order($data, $product)
    {
        if($product->stock > $data['quantity']) {
            $order = $this->orderRepository->getOrderInProgress();

            if(!$order) {
                $order = $this->orderRepository->create();
            }

            $cart = $this->cartRepository->get($product, $order);

            $processedData = null;
            if(!$cart) {
                $processedData = [
                    $product->id => [
                        'quantity' => $data['quantity'],
                        'subtotal_price' => $product->price * $data['quantity'],
                    ]
                ];
            } else {
                $quantity = $cart->quantity + $data['quantity'];

                $processedData = [
                    $product->id => [
                        'quantity' => $quantity,
                        'subtotal_price' => $product->price * $quantity,
                    ]
                ];
            }

            $this->cartRepository->sync($processedData, $order);

            $this->updateTotalPrice($order);
        }
    }

    public function remove($product)
    {
        $order = $this->orderRepository->getOrderInProgress();

        if($this->cartRepository->hasCart($order)) {
            $this->cartRepository->detach($product->id, $order);
            $this->updateTotalPrice($order);
        } else {
            $this->orderRepository->delete($order);
        }
    }

    public function updateTotalPrice($order)
    {
        $total = $this->cartRepository->getTotalPrice($order);
        $this->orderRepository->update(['total_price' => $total], $order);
    }
}
