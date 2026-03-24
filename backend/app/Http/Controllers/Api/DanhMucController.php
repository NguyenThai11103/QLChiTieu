<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DanhMuc;
use Illuminate\Http\Request;

class DanhMucController extends Controller
{
    public function getDataDanhMuc()
    {
        $data = DanhMuc::all();
        
        return response()->json([
            'status' => 1,
            'data'   => $data
        ]);
    }

    public function storeDanhMuc(Request $request)
    {
        DanhMuc::create([
            'ten_danh_muc' => $request->ten_danh_muc,
            'loai'         => $request->loai,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Thêm mới danh mục thành công!'
        ]);
    }

    public function updateDanhMuc(Request $request)
    {
        DanhMuc::where('id', $request->id)->update([
            'ten_danh_muc' => $request->ten_danh_muc,
            'loai'         => $request->loai,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Cập nhật danh mục thành công!',
        ]);
    }

    public function destroyDanhMuc(Request $request)
    {
        DanhMuc::find($request->id)->delete();
        
        return response()->json([
            'status'  => 1,
            'message' => 'Xóa danh mục thành công!',
        ]);
    }
}
