<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    public function getAll()
    {
        return Loan::with('user:id,name')->all();
    }

    public function paginate($paginate)
    {
        return Loan::with('user:id,name')->paginate($paginate);
    }

    public function create($data)
    {
        return Loan::create($data);
    }
}
