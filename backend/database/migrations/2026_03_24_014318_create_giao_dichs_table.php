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
        Schema::create('giao_dichs', function (Blueprint $table) {
            $table->id();
            $table->integer('id_nguoi_dung');
            $table->integer('id_danh_muc');
            $table->decimal('so_tien', 15, 2);
            $table->string('loai');
            $table->text('noi_dung')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('giao_dichs');
    }
};
