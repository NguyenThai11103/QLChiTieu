<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NhacNho;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NhacNhoController extends Controller
{
    public function getDataNhacNho()
    {
        $user = Auth::guard('sanctum')->user();
        
        $data = NhacNho::where('id_nguoi_dung', $user->id ?? 1)->get();

        return response()->json([
            'status' => 1,
            'data'   => $data
        ]);
    }

    public function storeNhacNho(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        NhacNho::create([
            'id_nguoi_dung' => $user->id ?? 1,
            'tieu_de'       => $request->tieu_de,
            'so_tien'       => $request->so_tien,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Thêm mới nhắc nhở thành công!'
        ]);
    }

    public function updateNhacNho(Request $request)
    {
        NhacNho::where('id', $request->id)->update([
            'tieu_de' => $request->tieu_de,
            'so_tien' => $request->so_tien,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Cập nhật nhắc nhở thành công!',
        ]);
    }

    public function destroyNhacNho(Request $request)
    {
        NhacNho::find($request->id)->delete();

        return response()->json([
            'status'  => 1,
            'message' => 'Xóa nhắc nhở thành công!',
        ]);
    }
}
