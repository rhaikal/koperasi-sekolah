<?php

namespace App\Services;

use App\Repositories\CouponRepository;

class CouponService
{
    private CouponRepository $couponRepository;

    public function __construct(CouponRepository $couponRepository)
    {
        $this->couponRepository = $couponRepository;
    }

    public function getCoupons()
    {
        $coupons = $this->couponRepository->getAll();

        return $coupons;
    }
}
