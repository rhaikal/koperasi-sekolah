<?php

namespace App\Policies;

use App\Models\Loan;
use App\Models\User;
use Illuminate\Auth\Access\Response;
use Illuminate\Auth\Access\HandlesAuthorization;

class LoanPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Loan  $loan
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Loan $loan)
    {
        if($user->role > 2)
            return true;

        return $user->id == $loan->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }
}
