<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GiaoDichSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('giao_dichs')->delete();
        DB::table('giao_dichs')->truncate();
        DB::table('giao_dichs')->insert([
            ['id_nguoi_dung' => 1, 'id_danh_muc' => 1, 'so_tien' => 50000, 'loai' => 'chi', 'noi_dung' => 'Ăn sáng phở', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id_nguoi_dung' => 1, 'id_danh_muc' => 5, 'so_tien' => 15000000, 'loai' => 'thu', 'noi_dung' => 'Lương tháng hiện tại', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id_nguoi_dung' => 1, 'id_danh_muc' => 2, 'so_tien' => 30000, 'loai' => 'chi', 'noi_dung' => 'Đổ xăng', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
