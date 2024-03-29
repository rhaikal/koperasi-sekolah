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

    public function getOrderById($id)
    {
        return $this->orderRepository->getById($id);
    }

    public function getOrders($paginate = null, $own = true)
    {
        if($own) return $this->orderRepository->getAllOwn($paginate);
        else return $this->orderRepository->getAll($paginate);
    }

    public function getOrderInProgress()
    {
        return $this->orderRepository->getInProgress();
    }

    public function getOrderInCheckout($paginate = null, $own = true)
    {
        if($own) return $this->orderRepository->getOwnInCheckout($paginate);
        else {
            if(auth()->user()->role > 1) return $this->orderRepository->getInCheckout($paginate);
            else return $this->orderRepository->getInCheckoutExceptOwn($paginate);
        }
    }

    public function getPaidOrders($paginate = null)
    {
        return $this->orderRepository->getPaid($paginate);
    }

    public function countOrdersByStatus($status)
    {
        return $this->orderRepository->countByStatus($status);
    }

    public function sumOrdersTotalPrice()
    {
        return $this->orderRepository->sumTotalPrice();
    }

    public function getDoneOrders($paginate = null)
    {
        return $this->orderRepository->getDone($paginate);
    }

    public function getExpiredOrders($paginate = null)
    {
        return $this->orderRepository->getExpired($paginate);
    }

    public function getRecentOrders($limit = null)
    {
        return $this->orderRepository->limitOrders($limit);
    }

    public function getRevenueOrdersPerMonth()
    {
        return $this->orderRepository->getRevenuePerMonth();
    }

    public function order($data, $product)
    {
        if($product->stock >= $data['quantity']) {
            $order = $this->getOrderInProgress();

            if(!$order) $order = $this->orderRepository->create();

            $cart = $this->cartRepository->get($product, $order);

            if(!!$cart && $cart->quantity == $product->stock) return false;

            $processedData = (!$cart ?
                $this->processData($product, $data['quantity']) :
                $this->processData($product, $cart->quantity + $data['quantity'])
            );

            if($processedData[$product->id]['quantity'] > $product->stock) $processedData[$product->id]['quantity'] = $product->stock;

            $this->cartRepository->sync($processedData, $order);

            $this->updateTotalPrice($order);

            return true;
        }
    }

    public function update($data, $product)
    {
        $order = $this->getOrderInProgress();

        $processedData = $this->processData($product, $data['quantity']);

        $this->cartRepository->sync($processedData, $order);

        $this->updateTotalPrice($order);
    }

    public function remove($product)
    {
        $order = $this->getOrderInProgress();

        $this->cartRepository->detach($product->id, $order);

        if($this->cartRepository->hasCart($order)) {
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
