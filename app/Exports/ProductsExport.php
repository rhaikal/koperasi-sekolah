<?php

namespace App\Exports;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ProductsExport implements FromView
{
    private $date;

    public function __construct($date)
    {
        $this->date = $date;
    }

    public function view(): View
    {
        $products = DB::table('orders')
        ->join('invoices', 'orders.id', '=', 'invoices.order_id')
        ->join('payments', 'invoices.id', '=', 'payments.invoice_id')
        ->join('carts', 'orders.id', '=', 'carts.order_id')
        ->join('products', 'carts.product_id', 'products.id')
        ->select(
            DB::raw('products.name as name'),
            DB::raw('products.stock as stock'),
            DB::raw('sum(carts.quantity) as sold'),
        )->where('orders.status', '>', '1');

        if((isset($this->date['startDate'], $this->date['endDate']) && $this->date['startDate'] && $this->date['endDate']) && $this->date['endDate'] > $this->date['startDate'])
            $products = $products->whereBetween('payments.payment_date', [$this->date['startDate'], $this->date['endDate']]);
        else if((isset($this->date['startDate'], $this->date['endDate']) && $this->date['startDate'] && $this->date['endDate']) && $this->date['startDate'] == $this->date['endDate'])
            $products = $products->where('payments.payment_date', 'LIKE', '%'.$this->date['startDate'].'%');

        $products = $products->groupBy(['name', 'stock'])->get();

        return view('excel.products', [
            'products' => $products
        ]);
    }
}
