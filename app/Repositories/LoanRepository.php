<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    public function create($data)
    {
        return Loan::create($data);
    }
}
