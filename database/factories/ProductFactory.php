<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'image' => "/img/products/placeholder.jpg",
            'name' => fake()->words(rand(1, 2), true),
            'slug' => fake()->slug(2, true),
            'category_id' => rand(1,10),
            'price' => rand(10000, 250000),
            'stock' => rand(10 , 100),
            'description' => fake()->paragraph(3)
        ];
    }
}
