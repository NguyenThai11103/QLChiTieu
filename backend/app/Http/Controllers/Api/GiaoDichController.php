<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GiaoDich;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GiaoDichController extends Controller
{
    public function getDataGiaoDich()
    {
        $user = Auth::guard('sanctum')->user();
        
        $data = GiaoDich::where('id_nguoi_dung', $user->id ?? 1) // Để 1 tạm nếu bạn chưa dùng Auth
            ->join('danh_mucs', 'giao_dichs.id_danh_muc', 'danh_mucs.id')
            ->select('giao_dichs.*', 'danh_mucs.ten_danh_muc')
            ->get();

        return response()->json([
            'status' => 1,
            'data'   => $data
        ]);
    }

    public function storeGiaoDich(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        GiaoDich::create([
            'id_nguoi_dung' => $user->id ?? 1,
            'id_danh_muc'   => $request->id_danh_muc,
            'so_tien'       => $request->so_tien,
            'loai'          => $request->loai,
            'noi_dung'      => $request->noi_dung,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Thêm mới giao dịch thành công!'
        ]);
    }

    public function updateGiaoDich(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        GiaoDich::where('id', $request->id)->update([
            'id_danh_muc' => $request->id_danh_muc,
            'so_tien'     => $request->so_tien,
            'loai'        => $request->loai,
            'noi_dung'    => $request->noi_dung,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Cập nhật giao dịch thành công!',
        ]);
    }

    public function destroyGiaoDich(Request $request)
    {
        GiaoDich::find($request->id)->delete();
        
        return response()->json([
            'status'  => 1,
            'message' => 'Xóa giao dịch thành công!',
        ]);
    }
}
