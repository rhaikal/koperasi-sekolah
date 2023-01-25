<?php

namespace App\Repositories;

use App\Models\Payment;

class PaymentRepository
{
    public function create($data)
    {
        return Payment::create($data);
    }
}
