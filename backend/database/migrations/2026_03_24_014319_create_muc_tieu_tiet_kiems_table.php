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
        Schema::create('muc_tieu_tiet_kiems', function (Blueprint $table) {
            $table->id();
            $table->integer('id_nguoi_dung');
            $table->string('ten_muc_tieu');
            $table->decimal('so_tien_muc_tieu', 15, 2);
            $table->decimal('so_tien_hien_tai', 15, 2)->default(0);
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('muc_tieu_tiet_kiems');
    }
};
