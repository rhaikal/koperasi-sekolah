<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    private $loans;
    private $request;

    public function __construct()
    {
        $this->request = request();
        $this->loans = Loan::with('user:id,name')->latest();

        if($this->request->search)
            $this->loans = $this->loans->keyword($this->request->search);
    }

    public function getAll()
    {
        return $this->loans->all();
    }

    public function paginate($paginate)
    {
        $keyword = $this->request->search;

        if($keyword)
            $this->loans = $this->loans->orWhereHas('user', function($query) use ($keyword) {
                $query->where('name', 'LIKE', '%' . $keyword . '%');
            });

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
