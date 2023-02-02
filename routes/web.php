<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\OrderController as DashboardOrderController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\UserController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PickupController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/shop', [OrderController::class , 'index'])->name('shop.index');
Route::get('/shop/{product}', [OrderController::class , 'show'])->name('shop.show');

Route::middleware('role')->group(function () {
    // main page
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // order page
    Route::get('/dashboard/orders', [DashboardOrderController::class, 'index'])->name('order.index');
    Route::get('/dashboard/orders/{order}', [DashboardOrderController::class, 'show'])->name('order.show');
    // payment
    Route::post('/payment/{order}/cash', [PaymentController::class, 'storeCash'])->name('payment.store.cash');
    // pickup
    Route::post('/pickup/{order}', [PickupController::class, 'store'])->name('pickup.store');

    Route::middleware('role:pengurus')->group(function () {
        // products page
        Route::resource('/dashboard/products', ProductController::class);
        // categories page
        Route::apiResource('/dashboard/categories', CategoryController::class)->except('show');
        // user page
        Route::resource('/dashboard/users', UserController::class)->except('delete', 'destroy', 'create', 'store');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/order/{product}', [OrderController::class, 'store'])->name('order.store');
    Route::delete('/order/{product}', [OrderController::class, 'destroy'])->name('order.destroy');
    Route::delete('/order/{product}/exceed', [OrderController::class, 'removeOutOfStock'])->name('order.destroy.exceed');
    Route::put('/order/{product}', [OrderController::class, 'update'])->name('order.update');
    Route::put('/order/{product}', [OrderController::class, 'updateExceedLimit'])->name('order.update.exceed');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/payment/{order}', [PaymentController::class, 'show'])->name('payment.show');
    Route::post('/payment/e-wallet', [PaymentController::class, 'storeEWallet'])->name('payment.store.e-wallet');

    Route::get('/history', [HistoryController::class, 'index'])->name('history.index');
});

require __DIR__.'/auth.php';
