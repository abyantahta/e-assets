<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'created_at' => time(),
            'updated_at' => time(),
            'user_id' => 1,
            'lokasi' => fake()->randomElement(["Taruma", "Dojo", "Pos Satpam", "Gedung Baru", "Gedung Lama"]),
            'pic' => fake()->randomElement(["Abyan", "Amrullah", "Hilal", "Pietra", "Andrian"]),
            'Kondisi' => fake()->randomElement(["Baik", "Kurang", "Rusak"]),
            'image_path' => fake()->imageUrl(),
            //
        ];
    }
}
