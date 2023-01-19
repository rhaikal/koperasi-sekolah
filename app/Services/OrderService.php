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

    public function getOrderInProgress()
    {
        return $this->orderRepository->getOrderInProgress();
    }

    public function order($data, $product)
    {
        if($product->stock > $data['quantity']) {
            $order = $this->orderRepository->getOrderInProgress();

            if(!$order) {
                $order = $this->orderRepository->create();
            }

            $cart = $this->cartRepository->get($product, $order);

            $processedData = (!$cart ?
                $this->processData($product, $data['quantity']) :
                $this->processData($product, $cart->quantity + $data['quantity'])
            );

            $this->cartRepository->sync($processedData, $order);

            $this->updateTotalPrice($order);
        }
    }

    public function update($data, $product)
    {
        $order = $this->orderRepository->getOrderInProgress();

        $processedData = $this->processData($product, $data['quantity']);

        $this->cartRepository->sync($processedData, $order);

        $this->updateTotalPrice($order);
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

    public function processData($product, $quantity)
    {
        $processedData = [
            $product->id => [
                'quantity' => $quantity,
                'subtotal_price' => $product->price * $quantity,
            ]
        ];

        return $processedData;
    }
}
