<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Coupon>
 */
class CouponFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'code' => fake()->regexify('[A-Z]{3}[0-4]{3}'),
            'discount' => fake()->randomFloat(2, 0, 0.99),
            'max_used' => rand(1, 5),
            'description' => fake()->text(),
            'expired_at' => now()->addDays(rand(3,20))
        ];
    }
}
