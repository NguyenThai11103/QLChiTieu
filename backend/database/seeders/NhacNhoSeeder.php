<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class NhacNhoSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('nhac_nhos')->insert([
            ['id_nguoi_dung' => 1, 'tieu_de' => 'Đóng tiền nhà', 'so_tien' => 3000000, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['id_nguoi_dung' => 1, 'tieu_de' => 'Đóng tiền điện', 'so_tien' => 500000, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ]);
    }
}
