<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MucTieuTietKiem extends Model
{
    protected $table = 'muc_tieu_tiet_kiems';

    protected $fillable = [
        'id_nguoi_dung',
        'ten_muc_tieu',
        'so_tien_muc_tieu',
        'so_tien_hien_tai',
    ];

}
