<?php

namespace App\Exports;

use App\Models\Order;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class OrdersExport implements FromView
{
    public function view(): View
    {
        $orders = Order::with(['user:id,name', 'invoice'])->where('status', '>', '1')->latest()->get();

        return view('excel.orders', [
            'orders' => $orders
        ]);
    }
}
