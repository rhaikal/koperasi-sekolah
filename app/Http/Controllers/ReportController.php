<?php

namespace App\Http\Controllers;

use App\Exports\LoansExport;
use App\Exports\OrdersExport;
use App\Exports\ProductsExport;
use App\Http\Requests\ReportRequest;
use App\Models\Order;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    public function invoice(Order $order)
    {
        $this->authorize('view', $order);

        $order->load(['user:id,name,email,no_phone', 'invoice']);

        $pdf = Pdf::loadView('pdf.invoice', [
            'order' => $order
        ]);

        return $pdf->stream('invoice-' . $order->shortId . '.pdf');
    }

    public function orders(ReportRequest $request)
    {
        return Excel::download(new OrdersExport($request->validated()), 'orders.xlsx');
    }

    public function loans(ReportRequest $request)
    {
        return Excel::download(new LoansExport($request->validated()), 'loan.xlsx');
    }

    public function products(ReportRequest $request)
    {
        return Excel::download(new ProductsExport($request->validated()), 'products.xlsx');
    }
}
