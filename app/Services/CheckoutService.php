<?php

namespace App\Services;

use App\Repositories\InvoiceRepository;
use App\Repositories\OrderRepository;
use Symfony\Component\Translation\Exception\NotFoundResourceException;

class CheckoutService
{
    private OrderRepository $orderRepository;
    private InvoiceRepository $invoiceRepository;

    public function __construct(OrderRepository $orderRepository, InvoiceRepository $invoiceRepository)
    {
        $this->orderRepository = $orderRepository;
        $this->invoiceRepository = $invoiceRepository;
    }

    public function store($data)
    {
        $order = $this->orderRepository->getOrderInProgress();

        if($order){
            $invoice = $this->invoiceRepository->create($data['method'], $order->id);

            if($invoice) $this->orderRepository->update(['status' => '1'], $order);

            return $invoice;
        } else throw new NotFoundResourceException;
    }
}
