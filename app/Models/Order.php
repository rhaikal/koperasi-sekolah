<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Order extends Model
{
    use HasFactory, HasUuids;

    /**
     * The relations to eager load on every query.
     *
     * @var array
     */
    protected $with = ['products'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'status',
        'total_price',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['shortId'];

    /**
     * Scope a query to only include order by keyword.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeKeyword($query, $keyword)
    {
        return $query->where('id', 'LIKE', '%' . $keyword . '%')
                    ->orWhereHas('user', function ($query) use ($keyword) {
                        $query->where('name', 'LIKE', '%' . $keyword . '%');
                    });
    }

    public function getShortIdAttribute()
    {
        return substr($this->id, 0, 8);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'carts')->withPivot('quantity', 'subtotal_price')->withTimestamps();
    }

    public function coupon()
    {
        return $this->belongsTo(Coupon::class);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    public function payment()
    {
        return $this->hasOneThrough(Payment::class, Invoice::class);
    }

    public function pickup()
    {
        return $this->hasOne(Pickup::class);
    }
}
