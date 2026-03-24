<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            NguoiDungSeeder::class,
            DanhMucSeeder::class,
            GiaoDichSeeder::class,
            NganSachSeeder::class,
            MucTieuTietKiemSeeder::class,
            NhacNhoSeeder::class,
        ]);
    }
}
