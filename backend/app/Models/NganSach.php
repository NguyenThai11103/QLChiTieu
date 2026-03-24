<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NganSach extends Model
{
    protected $table = 'ngan_sachs';

    protected $fillable = [
        'id_nguoi_dung',
        'id_danh_muc',
        'so_tien_ngan_sach',
        'thang',
    ];

  
}
