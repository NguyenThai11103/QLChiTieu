<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NguoiDung extends Model
{
    protected $table = 'nguoi_dung';
    protected $fillable = [
        'ho_ten',
        'password',
        'email',
        'so_dien_thoai',
        'avatar',
    ];


}
