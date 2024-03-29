<?php

namespace App\Http\Controllers;

use App\Http\Requests\Checkout\CheckoutRequest;
use App\Services\CheckoutService;
use App\Services\OrderService;
use Illuminate\Support\Facades\Redirect;

class CheckoutController extends Controller
{
    private CheckoutService $checkoutService;
    private OrderService $orderService;

    public function __construct(CheckoutService $checkoutService, OrderService $orderService)
    {
        $this->checkoutService = $checkoutService;
        $this->orderService = $orderService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $order = $this->orderService->getOrderInProgress();

        if($order){
            return inertia('Order/Checkout/Checkout');
        } else {
            return Redirect::route('shop.index');
        }
    }

    public function store(CheckoutRequest $request)
    {
        $validatedData = $request->validated();

        $order = $this->checkoutService->store($validatedData);

        return Redirect::route('payment.show', $order)->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil melakukan checkout',
        ]);
    }
}
