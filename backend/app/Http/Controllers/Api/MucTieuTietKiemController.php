<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\MucTieuTietKiem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MucTieuTietKiemController extends Controller
{
    public function getDataMucTieu()
    {
        $user = Auth::guard('sanctum')->user();
        
        $data = MucTieuTietKiem::where('id_nguoi_dung', $user->id ?? 1)->get();

        return response()->json([
            'status' => 1,
            'data'   => $data
        ]);
    }

    public function storeMucTieu(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        MucTieuTietKiem::create([
            'id_nguoi_dung'    => $user->id ?? 1,
            'ten_muc_tieu'     => $request->ten_muc_tieu,
            'so_tien_muc_tieu' => $request->so_tien_muc_tieu,
            'so_tien_hien_tai' => $request->so_tien_hien_tai ?? 0,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Thêm mới mục tiêu tiết kiệm thành công!'
        ]);
    }

    public function updateMucTieu(Request $request)
    {
        MucTieuTietKiem::where('id', $request->id)->update([
            'ten_muc_tieu'     => $request->ten_muc_tieu,
            'so_tien_muc_tieu' => $request->so_tien_muc_tieu,
            'so_tien_hien_tai' => $request->so_tien_hien_tai,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Cập nhật mục tiêu tiết kiệm thành công!',
        ]);
    }

    public function destroyMucTieu(Request $request)
    {
        MucTieuTietKiem::find($request->id)->delete();

        return response()->json([
            'status'  => 1,
            'message' => 'Xóa mục tiêu tiết kiệm thành công!',
        ]);
    }

    public function napTien(Request $request)
    {
        $mucTieu = MucTieuTietKiem::find($request->id);
        if ($mucTieu) {
            $mucTieu->so_tien_hien_tai += $request->so_tien ?? 0;
            $mucTieu->save();
        }

        return response()->json([
            'status'  => 1,
            'message' => 'Nạp tiền vào mục tiêu tiết kiệm thành công!',
        ]);
    }
}
