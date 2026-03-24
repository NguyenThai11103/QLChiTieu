<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NganSach;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NganSachController extends Controller
{
    public function getDataNganSach()
    {
        $user = Auth::guard('sanctum')->user();
        
        $data = NganSach::where('id_nguoi_dung', $user->id ?? 1)
            ->join('danh_mucs', 'ngan_sachs.id_danh_muc', 'danh_mucs.id')
            ->select('ngan_sachs.*', 'danh_mucs.ten_danh_muc')
            ->get();

        return response()->json([
            'status' => 1,
            'data'   => $data
        ]);
    }

    public function storeNganSach(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        NganSach::create([
            'id_nguoi_dung'     => $user->id ?? 1,
            'id_danh_muc'       => $request->id_danh_muc,
            'so_tien_ngan_sach' => $request->so_tien_ngan_sach,
            'thang'             => $request->thang,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Thêm mới ngân sách thành công!'
        ]);
    }

    public function updateNganSach(Request $request)
    {
        $user = Auth::guard('sanctum')->user();

        NganSach::where('id', $request->id)->update([
            'id_danh_muc'       => $request->id_danh_muc,
            'so_tien_ngan_sach' => $request->so_tien_ngan_sach,
            'thang'             => $request->thang,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Cập nhật ngân sách thành công!',
        ]);
    }

    public function destroyNganSach(Request $request)
    {
        NganSach::find($request->id)->delete();

        return response()->json([
            'status'  => 1,
            'message' => 'Xóa ngân sách thành công!',
        ]);
    }
}
