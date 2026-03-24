<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NganSachSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('ngan_sachs')->delete();
        DB::table('ngan_sachs')->truncate();
        DB::table('ngan_sachs')->insert([
            ['id_nguoi_dung' => 1, 'id_danh_muc' => 1, 'so_tien_ngan_sach' => 2000000, 'thang' => Carbon::now()->month, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id_nguoi_dung' => 1, 'id_danh_muc' => 2, 'so_tien_ngan_sach' => 500000, 'thang' => Carbon::now()->month, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
