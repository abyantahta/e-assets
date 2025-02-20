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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('created_by')->constrained('users');
            $table->string('item_id');
            $table->foreign('item_id')->references('no_asset')->on('items');
            // $table->string('no_asset')->unique();
            // $table->string('asset_name');
            $table->foreignId('updated_by')->nullable()->default(null)->constrained('users');
            $table->string('lokasi');
            $table->string('keterangan')->nullable();
            $table->foreignId('pic')->nullable()->default(null)->constrained('users');
            // $table->string('pic');
            $table->string('kondisi');
            $table->string('image_path')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
