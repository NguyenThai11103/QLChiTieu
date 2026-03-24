<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NguoiDung;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class NguoiDungController extends Controller
{
    public function getDataNguoiDung()
    {
        $data = NguoiDung::all();

        return response()->json([
            'status' => 1,
            'data'   => $data
        ]);
    }

    public function storeNguoiDung(Request $request)
    {
        NguoiDung::create([
            'ho_ten'        => $request->ho_ten,
            'email'         => $request->email,
            'password'      => Hash::make($request->password),
            'so_dien_thoai' => $request->so_dien_thoai,
            'avatar'        => $request->avatar,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Thêm mới người dùng thành công!'
        ]);
    }

    public function updateNguoiDung(Request $request)
    {
        $updateData = [
            'ho_ten'        => $request->ho_ten,
            'email'         => $request->email,
            'so_dien_thoai' => $request->so_dien_thoai,
            'avatar'        => $request->avatar,
        ];

        if ($request->has('password') && !empty($request->password)) {
            $updateData['password'] = Hash::make($request->password);
        }

        NguoiDung::where('id', $request->id)->update($updateData);

        return response()->json([
            'status'  => 1,
            'message' => 'Cập nhật người dùng thành công!',
        ]);
    }

    public function destroyNguoiDung(Request $request)
    {
        NguoiDung::find($request->id)->delete();

        return response()->json([
            'status'  => 1,
            'message' => 'Xóa người dùng thành công!',
        ]);
    }
}
