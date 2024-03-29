<?php

namespace App\Services;

use App\Repositories\LoanRepository;

class LoanService
{
    private LoanRepository $loanRepository;

    public function __construct(LoanRepository $loanRepository)
    {
        $this->loanRepository = $loanRepository;
    }


    public function getLoans($paginate = null)
    {
        $user = auth()->user();

        if($paginate){
            return $user->role == 2 ?
                $this->loanRepository->paginateOwn($paginate, $user->id) :
                $this->loanRepository->paginate($paginate);
        }

        return $this->loanRepository->getAll();
    }

    public function createLoan($data)
    {
        return $this->loanRepository->create($data);
    }

    public function updateLoan($data, $loan)
    {
        return $this->loanRepository->update($data, $loan);
    }

    public function deleteLoan($loan)
    {
        return $this->loanRepository->delete($loan);
    }
}
