<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $with = ['category'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'image',
        'name',
        'slug',
        'category_id',
        'price',
        'stock',
        'description'
    ];

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Scope a query to only include users by keyword.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeKeyword($query, $keyword)
    {
        return $query->where('name', 'LIKE', '%' . $keyword . '%')
                    ->orWhere('slug', 'LIKE', '%' . $keyword . '%');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'carts');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
