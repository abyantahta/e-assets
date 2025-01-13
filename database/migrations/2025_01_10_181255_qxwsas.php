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
        Schema::create('qxwsas', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('qxwsa_wsa_url');
            $table->string('qxwsa_wsa_path');
            $table->string('qxwsa_wsa_domain');
            $table->string('qxwsa_qxtend_url')->nullable();
            $table->string('qxwsa_qxtend_receiver')->nullable();
        });
        //
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
