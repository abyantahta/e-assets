<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Item;
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
            'email_verified_at' => time()
        ]);
        Category::factory()->create([
            'name' => 'Tooling'
        ]);
        Category::factory()->create([
            'name' => 'Tooling2'
        ]);
        Category::factory()->create([
            'name' => 'Tooling3'
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

        Item::factory()->count(90)->create();
    }
}
