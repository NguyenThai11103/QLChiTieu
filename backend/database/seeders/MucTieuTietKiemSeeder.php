<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class MucTieuTietKiemSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('muc_tieu_tiet_kiems')->delete();
        DB::table('muc_tieu_tiet_kiems')->truncate();
        DB::table('muc_tieu_tiet_kiems')->insert([
            ['id_nguoi_dung' => 1, 'ten_muc_tieu' => 'Mua điện thoại mới', 'so_tien_muc_tieu' => 20000000, 'so_tien_hien_tai' => 5000000, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id_nguoi_dung' => 1, 'ten_muc_tieu' => 'Đi du lịch', 'so_tien_muc_tieu' => 10000000, 'so_tien_hien_tai' => 2000000, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
