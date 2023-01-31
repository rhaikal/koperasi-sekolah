<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if(auth()->check()){
            $user = auth()->user();

            if($user->role > '1' && empty($roles)) return $next($request);

            foreach($roles as $role) {
                if($user->hasRole($role)) return $next($request);
            }
        } abort(404);
    }
}
