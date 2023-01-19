<?php

namespace App\Repositories;

use App\Models\Invoice;

class InvoiceRepository
{
    public function create($method, $orderId)
    {
        $savedData = [
            'order_id' => $orderId,
            'method' => $method,
            'due_date' => now()->addDays(2),
        ];

        $invoice = Invoice::create($savedData);

        return $invoice;
    }
}
