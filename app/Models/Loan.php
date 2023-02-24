<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'ammount',
        'term_of_payment',
    ];

    /**
     * Scope a query to only include loans by keyword.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeKeyword($query, $keyword)
    {
        $query = $query->where('id', 'LIKE', '%' . $keyword . '%');

        return $query;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
