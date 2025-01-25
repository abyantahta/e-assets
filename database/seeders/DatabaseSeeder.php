<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Item;
use App\Models\Qxwsas;
use App\Models\Transaction;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Abyan ',
            'email' => 'abyantahta2002@gmail.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time(),
            'role' => 'admin'
        ]);
        Category::factory()->create([
            'name' => 'Tooling'
        ]);
        Category::factory()->create([
            'name' => 'Building'
        ]);
        Category::factory()->create([
            'name' => 'Vehicle'
        ]);
        Category::factory()->create([
            'name' => 'Office Equipment'
        ]);
        Category::factory()->create([
            'name' => 'Machine'
        ]);
        
        Qxwsas::factory()->create();

        // Item::factory()->count(200)->create();
        // Transaction::factory()->count(100)->create();
    }
}
