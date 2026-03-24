<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NhacNho extends Model
{
    protected $table = 'nhac_nhos';

    protected $fillable = [
        'id_nguoi_dung',
        'tieu_de',
        'so_tien',
    ];
}
