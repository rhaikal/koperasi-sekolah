<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Services\PickupService;
use Illuminate\Support\Facades\Redirect;

class PickupController extends Controller
{
    private PickupService $pickupService;

    public function __construct(PickupService $pickupService)
    {
        $this->pickupService = $pickupService;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  App\Models\Order $order
     * @return \Illuminate\Http\Response
     */
    public function store(Order $order)
    {
        if($order->status == '2'){
            $this->pickupService->pickup($order);

            return Redirect::back()->with('alert', [
                'icon' => 'success',
                'message' => 'Berhasil mengkonfirmasi pengambilan',
            ]);
        } else abort(404);
    }
}
