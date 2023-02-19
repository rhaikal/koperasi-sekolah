<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(5)->create();
        \App\Models\Category::factory(10)->create();
        \App\Models\Product::factory(20)->create();

        \App\Models\User::factory()->create([
            'role' => 3,
            'username' => 'rhaikal',
            'name' => 'Ricko Haikal',
            'email' => 'rickohaikal@gmail.com',
            'no_phone' => '082131591516',
            'password' => Hash::make('ricko123'),
        ]);
    }
}
