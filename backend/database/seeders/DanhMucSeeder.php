<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DanhMucSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('danh_mucs')->delete();
        DB::table('danh_mucs')->truncate();
        DB::table('danh_mucs')->insert([
            ['ten_danh_muc' => 'Ăn uống', 'loai' => 'chi', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['ten_danh_muc' => 'Đi lại', 'loai' => 'chi', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['ten_danh_muc' => 'Mua sắm', 'loai' => 'chi', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['ten_danh_muc' => 'Sinh hoạt', 'loai' => 'chi', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['ten_danh_muc' => 'Lương', 'loai' => 'thu', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['ten_danh_muc' => 'Thưởng', 'loai' => 'thu', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['ten_danh_muc' => 'Thu nhập khác', 'loai' => 'thu', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
