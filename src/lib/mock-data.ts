/**
 * MOCK DATA
 */

import {
    DanhMuc,
    GiaoDich,
    NganSach,
    MucTieuTietKiem,
    NhacNho,
    TongQuanTaiChinh,
    ThongKeTheoDanhMuc,
    BieuDoChiTieu,
    SoSanhThang,
} from '@/types';

// ============================================================
// DANH MỤC
// ============================================================
export const MOCK_DANH_MUC: DanhMuc[] = [
    { id: 1,  ten_danh_muc: 'Ăn uống',      loai: 'chi' },
    { id: 2,  ten_danh_muc: 'Di chuyển',    loai: 'chi' },
    { id: 3,  ten_danh_muc: 'Mua sắm',      loai: 'chi' },
    { id: 4,  ten_danh_muc: 'Hóa đơn',      loai: 'chi' },
    { id: 5,  ten_danh_muc: 'Giải trí',     loai: 'chi' },
    { id: 6,  ten_danh_muc: 'Sức khỏe',     loai: 'chi' },
    { id: 7,  ten_danh_muc: 'Giáo dục',     loai: 'chi' },
    { id: 8,  ten_danh_muc: 'Nhà ở',        loai: 'chi' },
    { id: 9,  ten_danh_muc: 'Lương',        loai: 'thu' },
    { id: 10, ten_danh_muc: 'Thưởng',       loai: 'thu' },
    { id: 11, ten_danh_muc: 'Đầu tư',       loai: 'thu' },
    { id: 12, ten_danh_muc: 'Làm thêm',     loai: 'thu' },
];

// ============================================================
// GIAO DỊCH (tháng 3/2026)
// ============================================================
export const MOCK_GIAO_DICH: GiaoDich[] = [
    { id: 1,  id_nguoi_dung: 1, id_danh_muc: 9,  so_tien: 15_000_000, loai: 'thu', noi_dung: 'Lương tháng 3',       danh_muc: MOCK_DANH_MUC[8],  created_at: '2026-03-01' },
    { id: 2,  id_nguoi_dung: 1, id_danh_muc: 8,  so_tien: 4_500_000,  loai: 'chi', noi_dung: 'Tiền thuê nhà',       danh_muc: MOCK_DANH_MUC[7],  created_at: '2026-03-02' },
    { id: 3,  id_nguoi_dung: 1, id_danh_muc: 1,  so_tien: 85_000,     loai: 'chi', noi_dung: 'Cơm trưa văn phòng',  danh_muc: MOCK_DANH_MUC[0],  created_at: '2026-03-03' },
    { id: 4,  id_nguoi_dung: 1, id_danh_muc: 2,  so_tien: 50_000,     loai: 'chi', noi_dung: 'Grab đi làm',         danh_muc: MOCK_DANH_MUC[1],  created_at: '2026-03-03' },
    { id: 5,  id_nguoi_dung: 1, id_danh_muc: 4,  so_tien: 350_000,    loai: 'chi', noi_dung: 'Tiền điện tháng 2',   danh_muc: MOCK_DANH_MUC[3],  created_at: '2026-03-04' },
    { id: 6,  id_nguoi_dung: 1, id_danh_muc: 1,  so_tien: 120_000,    loai: 'chi', noi_dung: 'Ăn tối với gia đình', danh_muc: MOCK_DANH_MUC[0],  created_at: '2026-03-05' },
    { id: 7,  id_nguoi_dung: 1, id_danh_muc: 11, so_tien: 500_000,    loai: 'thu', noi_dung: 'Cổ tức quỹ ETF',      danh_muc: MOCK_DANH_MUC[10], created_at: '2026-03-07' },
    { id: 8,  id_nguoi_dung: 1, id_danh_muc: 3,  so_tien: 299_000,    loai: 'chi', noi_dung: 'Áo thun Uniqlo',      danh_muc: MOCK_DANH_MUC[2],  created_at: '2026-03-08' },
    { id: 9,  id_nguoi_dung: 1, id_danh_muc: 5,  so_tien: 79_000,     loai: 'chi', noi_dung: 'Netflix tháng 3',     danh_muc: MOCK_DANH_MUC[4],  created_at: '2026-03-10' },
];

export const MOCK_TONG_QUAN: TongQuanTaiChinh = {
    tong_thu:        17_500_000,
    tong_chi:         6_648_000,
    so_du:           10_852_000,
    so_giao_dich:    15,
};

export const MOCK_THEO_DANH_MUC: ThongKeTheoDanhMuc[] = [
    { danh_muc: MOCK_DANH_MUC[0], tong_tien: 620_000,   so_giao_dich: 4, ty_le_phan_tram: 33.2 },
    { danh_muc: MOCK_DANH_MUC[7], tong_tien: 4_500_000, so_giao_dich: 1, ty_le_phan_tram: 22.3 },
    { danh_muc: MOCK_DANH_MUC[1], tong_tien: 150_000,   so_giao_dich: 2, ty_le_phan_tram: 9.1  },
];

export const MOCK_BIEU_DO: BieuDoChiTieu[] = [
    { ngay: '2026-03-13', tong_thu: 0,          tong_chi: 0       },
    { ngay: '2026-03-14', tong_thu: 0,          tong_chi: 65_000  },
];

export const MOCK_SO_SANH_THANG: SoSanhThang[] = [
    { thang: 1,  tong_thu: 15_000_000, tong_chi: 8_200_000, so_du: 6_800_000  },
    { thang: 2,  tong_thu: 16_500_000, tong_chi: 7_100_000, so_du: 9_400_000  },
    { thang: 3,  tong_thu: 17_500_000, tong_chi: 6_648_000, so_du: 10_852_000 },
];

// ============================================================
// NGÂN SÁCH (tháng 3/2026)
// ============================================================
export const MOCK_NGAN_SACH: NganSach[] = [
    { id: 1, id_nguoi_dung: 1, id_danh_muc: 1, so_tien_ngan_sach: 1_500_000, thang: 3, da_su_dung: 620_000,   phan_tram_su_dung: 41.3, danh_muc: MOCK_DANH_MUC[0] },
    { id: 2, id_nguoi_dung: 1, id_danh_muc: 2, so_tien_ngan_sach: 500_000,   thang: 3, da_su_dung: 150_000,   phan_tram_su_dung: 30.0, danh_muc: MOCK_DANH_MUC[1] },
];

// ============================================================
// MỤC TIÊU TIẾT KIỆM
// ============================================================
export const MOCK_MUC_TIEU: MucTieuTietKiem[] = [
    { id: 1, id_nguoi_dung: 1, ten_muc_tieu: 'Mua xe máy Honda Air Blade', so_tien_muc_tieu: 45_000_000, so_tien_hien_tai: 18_000_000, phan_tram_hoan_thanh: 40 },
    { id: 2, id_nguoi_dung: 1, ten_muc_tieu: 'Du lịch Nhật Bản',           so_tien_muc_tieu: 30_000_000, so_tien_hien_tai: 12_500_000, phan_tram_hoan_thanh: 41.7 },
];

// ============================================================
// NHẮC NHỞ
// ============================================================
export const MOCK_NHAC_NHO: NhacNho[] = [
    { id: 1, id_nguoi_dung: 1, tieu_de: 'Trả tiền thuê nhà',       so_tien: 4500000 },
    { id: 2, id_nguoi_dung: 1, tieu_de: 'Thanh toán Netflix',      so_tien: 79000 },
];
