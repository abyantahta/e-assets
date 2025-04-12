<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\User;
use App\Models\Item;
use App\Models\Qxwsas;
use App\Models\Role;
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

        Role::factory()->create([
            'name' => 'user'
        ]);        
        Role::factory()->create([
            'name' => 'admin'
        ]);
        User::factory()->create([
            'name' => 'Abyan ',
            'email' => 'abyantahta2002@gmail.com',
            'password' => bcrypt('12345678'),
            'email_verified_at' => time(),
            'position' => 'IT Staff',
            'role_id' => 2
        ]);
        Category::factory()->create([
            'name' => 'Tooling',
            'lifetime'=> 60
        ]);
        Category::factory()->create([
            'name' => 'Building',
            'lifetime'=> 240
        ]);
        Category::factory()->create([
            'name' => 'Vehicle',
            'lifetime'=> 60
        ]);
        Category::factory()->create([
            'name' => 'Office Equipment',
            'lifetime'=> 60
        ]);
        Category::factory()->create([
            'name' => 'Machine',
            'lifetime'=> 96
        ]);
        
        Qxwsas::factory()->create();

        // Item::factory()->count(200)->create();
        // Transaction::factory()->count(100)->create();
    }
}
