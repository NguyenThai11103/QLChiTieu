<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\DanhMucController;
use App\Http\Controllers\Api\GiaoDichController;
use App\Http\Controllers\Api\NganSachController;
use App\Http\Controllers\Api\MucTieuTietKiemController;
use App\Http\Controllers\Api\NhacNhoController;
use App\Http\Controllers\Api\NguoiDungController;

// Bạn có thể bọc qua middleware auth:sanctum để sử dụng Auth::user()
// Route::group(['middleware' => 'auth:sanctum'], function () {

Route::group(['prefix' => '/danh-muc'], function () {
    Route::get('/data',                [DanhMucController::class, 'getDataDanhMuc']);
    Route::post('/create',             [DanhMucController::class, 'storeDanhMuc']);
    Route::post('/update',             [DanhMucController::class, 'updateDanhMuc']);
    Route::post('/delete',             [DanhMucController::class, 'destroyDanhMuc']);
});

Route::group(['prefix' => '/giao-dich'], function () {
    Route::get('/data',                [GiaoDichController::class, 'getDataGiaoDich']);
    Route::post('/create',             [GiaoDichController::class, 'storeGiaoDich']);
    Route::post('/update',             [GiaoDichController::class, 'updateGiaoDich']);
    Route::post('/delete',             [GiaoDichController::class, 'destroyGiaoDich']);
});

Route::group(['prefix' => '/ngan-sach'], function () {
    Route::get('/data',                [NganSachController::class, 'getDataNganSach']);
    Route::post('/create',             [NganSachController::class, 'storeNganSach']);
    Route::post('/update',             [NganSachController::class, 'updateNganSach']);
    Route::post('/delete',             [NganSachController::class, 'destroyNganSach']);
});

Route::group(['prefix' => '/muc-tieu'], function () {
    Route::get('/data',                [MucTieuTietKiemController::class, 'getDataMucTieu']);
    Route::post('/create',             [MucTieuTietKiemController::class, 'storeMucTieu']);
    Route::post('/update',             [MucTieuTietKiemController::class, 'updateMucTieu']);
    Route::post('/delete',             [MucTieuTietKiemController::class, 'destroyMucTieu']);
    Route::post('/nap-tien',           [MucTieuTietKiemController::class, 'napTien']);
});

Route::group(['prefix' => '/nhac-nho'], function () {
    Route::get('/data',                [NhacNhoController::class, 'getDataNhacNho']);
    Route::post('/create',             [NhacNhoController::class, 'storeNhacNho']);
    Route::post('/update',             [NhacNhoController::class, 'updateNhacNho']);
    Route::post('/delete',             [NhacNhoController::class, 'destroyNhacNho']);
});

Route::group(['prefix' => '/nguoi-dung'], function () {
    Route::get('/data',                [NguoiDungController::class, 'getDataNguoiDung']);
    Route::post('/create',             [NguoiDungController::class, 'storeNguoiDung']);
    Route::post('/update',             [NguoiDungController::class, 'updateNguoiDung']);
    Route::post('/delete',             [NguoiDungController::class, 'destroyNguoiDung']);
});

// });
