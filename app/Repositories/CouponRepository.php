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

    public function create($data)
    {
        $coupon = Coupon::create($data);

        return $coupon;
    }

    public function update(Coupon $coupon, $data)
    {
        return $coupon->update($data);
    }
}
