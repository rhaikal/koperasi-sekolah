<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class OrdersExport implements FromView
{
    private $date;

    public function __construct($date)
    {
        $this->date = $date;
    }

    public function view(): View
    {
        $orders = Order::with(['user:id,name', 'invoice', 'payment'])->where('status', '>', '1')->latest();

        $date = $this->date;
        if((isset($this->date['startDate'], $this->date['endDate']) && $this->date['startDate'] && $this->date['endDate']) && $this->date['startDate'] > $this->date['endDate'])
            $orders = $orders->whereHas('payment', function ($query) use ($date) {
                return $query->whereBetween('payment_date', [$date['startDate'], $date['endDate']]);
            });
        else if((isset($this->date['startDate'], $this->date['endDate']) && $this->date['startDate'] && $this->date['endDate']) && $this->date['startDate'] == $this->date['endDate'])
            $orders = $orders->whereHas('payment', function ($query) use ($date) {
                return $query->where('payment_date', 'LIKE', '%'.$this->date['startDate'].'%');
            });

        $orders = $orders->get();

        return view('excel.orders', [
            'orders' => $orders
        ]);
    }
}
