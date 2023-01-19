<?php

namespace App\Services;

use App\Repositories\InvoiceRepository;
use App\Repositories\OrderRepository;
use App\Repositories\productRepository;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class CheckoutService
{
    private OrderRepository $orderRepository;
    private InvoiceRepository $invoiceRepository;
    private productRepository $productRepository;

    public function __construct(OrderRepository $orderRepository, InvoiceRepository $invoiceRepository, productRepository $productRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->invoiceRepository = $invoiceRepository;
        $this->productRepository = $productRepository;
    }

    public function store($data)
    {
        $order = $this->orderRepository->getInProgress();

        if($order){
            $invoice = $this->invoiceRepository->create($data['method'], $order->id);

            if($invoice) {
                foreach($order->products as $product) {
                    $this->productRepository->update($product, [
                        'stock' => $product->stock - $product->pivot->quantity
                    ]);
                }

                $this->orderRepository->update(['status' => '1'], $order);
            }

            return $invoice;
        } else throw new NotFoundResourceException;
    }
}
