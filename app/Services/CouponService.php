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

    public function create($data)
    {
        $data['discount'] = $data['discount'] / 100;

        $coupon = $this->couponRepository->create($data);

        return $coupon;
    }
}
