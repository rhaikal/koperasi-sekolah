<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateExpiredOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update orders status when expired';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $query = Order::where('status', '=', '1')
            ->whereHas('invoice', function($query) {
                $query->where('due_date', '<', now());
            });

        $orders = $query->get();
        if(!empty($orders)){
            foreach($orders as $order){
                foreach($order->products as $product)
                    $product->update(['stock' => $product->stock + $product->pivot->quantity]);
            }

            $query->update(['status' => '-']);

            return Command::SUCCESS;
        }

        return Command::FAILURE;
    }
}
