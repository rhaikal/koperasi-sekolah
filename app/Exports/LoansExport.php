<?php

namespace App\Exports;

use App\Models\Loan;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class LoansExport implements FromView
{
    private $date;

    public function __construct($date)
    {
        $this->date = $date;
    }

    public function view(): View
    {
        $loans = Loan::with(['user:id,name'])->latest();

        if((isset($this->date['startDate'], $this->date['endDate']) && $this->date['startDate'] && $this->date['endDate']) && $this->date['endDate'] > $this->date['startDate'])
            $loans = $loans->whereBetween('term_of_payment', [$this->date['startDate'], $this->date['endDate']]);
        else if((isset($this->date['startDate'], $this->date['endDate']) && $this->date['startDate'] && $this->date['endDate']) && $this->date['startDate'] == $this->date['endDate'])
            $loans = $loans->where('term_of_payment', 'LIKE', '%'.$this->date['startDate'].'%');

        $loans = $loans->get();

        return view('excel.loans', [
            'loans' => $loans
        ]);
    }
}
