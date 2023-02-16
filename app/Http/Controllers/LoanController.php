<?php

namespace App\Http\Controllers;

use App\Http\Requests\Loan\LoanRequest;
use App\Models\Loan;
use App\Services\LoanService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class LoanController extends Controller
{
    private LoanService $loanService;
    private UserService $userService;

    public function __construct(LoanService $loanService, UserService $userService)
    {
        $this->loanService = $loanService;
        $this->userService = $userService;
    }

    public function index()
    {
        return inertia('Dashboard/Loan/Loan', [
            'loans' => $this->loanService->getLoans(10)
        ]);
    }

    public function create()
    {
        return inertia('Dashboard/Loan/Create/Create', [
            'users' => $this->userService->getMembers()
        ]);
    }

    public function store(LoanRequest $request)
    {
        $validatedData = $request->validated();

        $this->loanService->createLoan($validatedData);

        return Redirect::route('loans.index')->with('alert', [
            'icon' => 'success',
            'message' => 'Berhasil menambahkan peminjaman',
        ]);
    }

    public function edit(Loan $loan)
    {
        return inertia('Dashboard/Loan/Edit/Edit', [
            'users' => $this->userService->getMembers(),
            'loan' => $loan
        ]);
    }
}
