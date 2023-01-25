<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\InvoiceController;
use App\Http\Controllers\Dashboard\PaidOrderController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\UnpaidOrderController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::inertia('/dashboard', 'Dashboard/Dashboard')->name('dashboard');
    Route::apiResource('/dashboard/categories', CategoryController::class)->except('show');
    Route::resource('/dashboard/products', ProductController::class);
    Route::get('/dashboard/orders/unpaid', [UnpaidOrderController::class, 'index'])->name('order.unpaid.index');
    Route::get('/dashboard/orders/unpaid/{invoice}', [UnpaidOrderController::class, 'show'])->name('order.unpaid.show');
    Route::post('/dashboard/orders/{order}', [UnpaidOrderController::class, 'payment'])->name('payment.store.cash');
    Route::get('/dashboard/orders/paid', [PaidOrderController::class, 'index'])->name('order.paid.index');

    Route::post('/order/{product}', [OrderController::class, 'store'])->name('order.store');
    Route::delete('/order/{product}', [OrderController::class, 'destroy'])->name('order.destroy');
    Route::put('/order/{product}', [OrderController::class, 'update'])->name('order.update');

    Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
    Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

    Route::get('/payment/{invoice}', [PaymentController::class, 'show'])->name('payment.show');

    Route::get('/history', [HistoryController::class, 'index'])->name('history.index');
});

require __DIR__.'/auth.php';
