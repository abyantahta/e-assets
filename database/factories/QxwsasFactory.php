<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Qxwsas>
 */
class QxwsasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => 1,
            'qxwsa_wsa_url' => 'http://qadeesdi.site:24079/wsa/wsatest',
            'qxwsa_wsa_path' => 'npm',
            'qxwsa_wsa_domain' =>'7000',
            'qxwsa_qxtend_url' => 'http://qadeesdi.site:24079/qxi/services/QdocWebService',
            //
        ];
    }
}
