<?php

namespace App\Services;

use App\Repositories\InvoiceRepository;
use App\Repositories\OrderRepository;
use App\Repositories\productRepository;
use Midtrans\Snap;
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
            $processedData = [
                'order_id' => $order->id,
                'method' => $data['method'],
                'due_date' => $data['method'] == 'cash' ? now()->addDays(2) : now()->addHours(),
            ];

            $product_detail = [];
            foreach($order->products as $product) {
                if($data['method'] == 'e-wallet') {
                    $product_detail[] = [
                        'id' => $product->id,
                        'price' => $product->price,
                        'quantity' => $product->pivot->quantity,
                        'name' => $product->name,
                        'category' => $product->category->name,
                    ];
                }

                $this->productRepository->update($product, [
                    'stock' => $product->stock - $product->pivot->quantity
                ]);
            }

            if($data['method'] == 'e-wallet'){
                $order->load('user:id,name,email,no_phone');
                $name = preg_split('/\s/', $order->user->name);

                $params = [
                    'transaction_details' => [
                        'order_id' => $order->id . '-' . $order->created_at->timestamp,
                        'gross_amount' => $order->total_price,
                    ],
                    'customer_details' => [
                        'first_name' => $name[0],
                        'last_name' => $name[1] ?? null,
                        'email' => $order->user->email,
                        'phone' => $order->user->no_phone,
                    ],
                    'item_details' => $product_detail,
                    "expiry" => [
                        "unit"=> "hour",
                        "duration"=> 1
                    ],
                    "enabled_payments" => ["shopeepay",'gopay'],
                ];

                $processedData['token'] = Snap::getSnapToken($params);
            }

            $this->invoiceRepository->create($processedData, $order->id);
            $this->orderRepository->update(['status' => '1'], $order);

            return $order;
        }
    }
}
