<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class NguoiDungSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('nguoi_dungs')->delete();
        DB::table('nguoi_dungs')->truncate();
        DB::table('nguoi_dungs')->insert([
            [
                'ho_ten' => 'Người Dùng Mẫu',
                'email' => 'user@example.com',
                'password' => Hash::make('123456'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'ho_ten' => 'Admin Hệ Thống',
                'email' => 'admin@example.com',
                'password' => Hash::make('123456'),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ]
        ]);
    }
}
