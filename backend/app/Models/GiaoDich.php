<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GiaoDich extends Model
{
    protected $table = 'giao_dichs';

    protected $fillable = [
        'id_nguoi_dung',
        'id_danh_muc',
        'so_tien',
        'loai',
        'noi_dung',
    ];

 

 
}
