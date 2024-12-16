<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('no_asset')->unique();
            $table->string('encrypted_no_asset');
            $table->string('name');
            $table->foreignId('category_id')->constrained('categories');
            $table->timestamp('service_date')->nullable();
            $table->boolean('isDisposition')->nullable();
            $table->integer('cost')->nullable();
            $table->integer('nbv')->nullable();
            $table->string('lokasi');
            // $table->string('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
