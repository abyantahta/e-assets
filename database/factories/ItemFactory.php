<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
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
            'no_asset' => fake()->sentence(),
            'name' => fake()->sentence(),
            'category_id' => fake()->randomElement([1,2,3,4,5]),
            'service_date' => fake()->date(),
            'isDisposition' => fake()->randomElement([true,false]),
            'cost' => fake()->randomNumber(),
            'nbv' => fake()->randomNumber(),
            'lokasi' => fake()->randomElement(["Taruma", "Dojo","Pos Satpam", "Gedung Baru", "Gedung Lama"]),
            // 'lokasi' => fake()->sentence(1),
            //
        ];
    }
}
