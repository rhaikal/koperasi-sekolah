<?php

namespace App\Exports;

use App\Models\Loan;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class LoansExport implements FromView
{
    public function view(): View
    {
        $loans = Loan::with(['user:id,name'])->latest()->get();

        return view('excel.loans', [
            'loans' => $loans
        ]);
    }
}
