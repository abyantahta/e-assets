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
        Schema::create('depreciations', function (Blueprint $table) {
            $table->id();
            $table->string('no_asset');
            $table->year('year')->nullable();
            $table->integer('month')->nullable();
            $table->float('depreciation')->nullable();
            $table->integer('category_id')->nullable();
            // $table->foreignId('item_id')->nullable()->default(null)->constrained('items');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('depreciations');
    }
};
