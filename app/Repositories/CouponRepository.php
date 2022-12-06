<?php

namespace App\Repositories;

use App\Models\Coupon;

class CouponRepository
{
    public function getAll()
    {
        $coupons = Coupon::all();

        return $coupons;
    }
}
