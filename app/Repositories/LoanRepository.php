<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    private $loans;

    public function __construct()
    {
        $request = request();
        $this->loans = Loan::with('user:id,name');

        if($request->search)
            $this->loans = $this->loans->keyword($request->search);
    }

    public function getAll()
    {
        return $this->loans->all();
    }

    public function paginate($paginate)
    {
        return $this->loans->paginate($paginate);
    }

    public function paginateOwn($paginate, $userId)
    {
        return $this->loans->where('user_id', $userId)->paginate($paginate);
    }

    public function create($data)
    {
        return Loan::create($data);
    }

    public function update($data, $loan)
    {
        return $loan->update($data);
    }

    public function delete($loan)
    {
        return $loan->delete();
    }
}
