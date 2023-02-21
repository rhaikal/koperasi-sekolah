<?php

namespace App\Http\Controllers;

use App\Exports\LoansExport;
use App\Exports\OrdersExport;
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

    public function orders()
    {
        return Excel::download(new OrdersExport, 'orders.xlsx');
    }

    public function loans()
    {
        return Excel::download(new LoansExport, 'loan.xlsx');
    }
}
