<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;

class LoanController extends Controller
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return inertia('Dashboard/Loan/Loan');
    }

    public function create()
    {
        return inertia('Dashboard/Loan/Create/Create', [
            'users' => $this->userService->getMembers()
        ]);
    }
}
