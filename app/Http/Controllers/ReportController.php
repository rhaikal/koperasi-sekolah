<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

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
}
