<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Order;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class OrderPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Order  $order
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Order $order)
    {
        if(request()->routeIs('order.show'))
        {
            if($user->role == '2')
            return $user->id != $order->user_id
                ? Response::allow()
                : Response::denyAsNotFound();
        }

        if($user->role > 2)
            return true;

        return $user->id == $order->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
