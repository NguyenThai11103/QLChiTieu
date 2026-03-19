/**
 * MOCK DATA — dùng cho UI tĩnh khi chưa có backend
 * Xoá file này khi BE sẵn sàng và kết nối hooks thật vào các page
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
    { id: 1,  ten: 'Ăn uống',      bieu_tuong: '🍔', mau_sac: '#f59e0b', loai: 'chi', danh_muc_cha_id: null },
    { id: 2,  ten: 'Di chuyển',    bieu_tuong: '🚌', mau_sac: '#3b82f6', loai: 'chi', danh_muc_cha_id: null },
    { id: 3,  ten: 'Mua sắm',      bieu_tuong: '🛒', mau_sac: '#ec4899', loai: 'chi', danh_muc_cha_id: null },
    { id: 4,  ten: 'Hóa đơn',      bieu_tuong: '💡', mau_sac: '#8b5cf6', loai: 'chi', danh_muc_cha_id: null },
    { id: 5,  ten: 'Giải trí',     bieu_tuong: '🎮', mau_sac: '#06b6d4', loai: 'chi', danh_muc_cha_id: null },
    { id: 6,  ten: 'Sức khỏe',     bieu_tuong: '💊', mau_sac: '#22c55e', loai: 'chi', danh_muc_cha_id: null },
    { id: 7,  ten: 'Giáo dục',     bieu_tuong: '📚', mau_sac: '#f97316', loai: 'chi', danh_muc_cha_id: null },
    { id: 8,  ten: 'Nhà ở',        bieu_tuong: '🏠', mau_sac: '#64748b', loai: 'chi', danh_muc_cha_id: null },
    { id: 9,  ten: 'Lương',        bieu_tuong: '💰', mau_sac: '#22c55e', loai: 'thu', danh_muc_cha_id: null },
    { id: 10, ten: 'Thưởng',       bieu_tuong: '🎁', mau_sac: '#f59e0b', loai: 'thu', danh_muc_cha_id: null },
    { id: 11, ten: 'Đầu tư',       bieu_tuong: '📈', mau_sac: '#3b82f6', loai: 'thu', danh_muc_cha_id: null },
    { id: 12, ten: 'Làm thêm',     bieu_tuong: '💼', mau_sac: '#8b5cf6', loai: 'thu', danh_muc_cha_id: null },
];

// ============================================================
// GIAO DỊCH (tháng 3/2026)
// ============================================================
export const MOCK_GIAO_DICH: GiaoDich[] = [
    { id: 1,  nguoi_dung_id: 1, danh_muc_id: 9,  so_tien: 15_000_000, loai: 'thu', noi_dung: 'Lương tháng 3',       ngay_giao_dich: '2026-03-01', danh_muc: MOCK_DANH_MUC[8],  created_at: '', updated_at: '' },
    { id: 2,  nguoi_dung_id: 1, danh_muc_id: 8,  so_tien: 4_500_000,  loai: 'chi', noi_dung: 'Tiền thuê nhà',       ngay_giao_dich: '2026-03-02', danh_muc: MOCK_DANH_MUC[7],  created_at: '', updated_at: '' },
    { id: 3,  nguoi_dung_id: 1, danh_muc_id: 1,  so_tien: 85_000,     loai: 'chi', noi_dung: 'Cơm trưa văn phòng',  ngay_giao_dich: '2026-03-03', danh_muc: MOCK_DANH_MUC[0],  created_at: '', updated_at: '' },
    { id: 4,  nguoi_dung_id: 1, danh_muc_id: 2,  so_tien: 50_000,     loai: 'chi', noi_dung: 'Grab đi làm',         ngay_giao_dich: '2026-03-03', danh_muc: MOCK_DANH_MUC[1],  created_at: '', updated_at: '' },
    { id: 5,  nguoi_dung_id: 1, danh_muc_id: 4,  so_tien: 350_000,    loai: 'chi', noi_dung: 'Tiền điện tháng 2',   ngay_giao_dich: '2026-03-04', danh_muc: MOCK_DANH_MUC[3],  created_at: '', updated_at: '' },
    { id: 6,  nguoi_dung_id: 1, danh_muc_id: 1,  so_tien: 120_000,    loai: 'chi', noi_dung: 'Ăn tối với gia đình', ngay_giao_dich: '2026-03-05', danh_muc: MOCK_DANH_MUC[0],  created_at: '', updated_at: '' },
    { id: 7,  nguoi_dung_id: 1, danh_muc_id: 11, so_tien: 500_000,    loai: 'thu', noi_dung: 'Cổ tức quỹ ETF',      ngay_giao_dich: '2026-03-07', danh_muc: MOCK_DANH_MUC[10], created_at: '', updated_at: '' },
    { id: 8,  nguoi_dung_id: 1, danh_muc_id: 3,  so_tien: 299_000,    loai: 'chi', noi_dung: 'Áo thun Uniqlo',      ngay_giao_dich: '2026-03-08', danh_muc: MOCK_DANH_MUC[2],  created_at: '', updated_at: '' },
    { id: 9,  nguoi_dung_id: 1, danh_muc_id: 5,  so_tien: 79_000,     loai: 'chi', noi_dung: 'Netflix tháng 3',     ngay_giao_dich: '2026-03-10', danh_muc: MOCK_DANH_MUC[4],  created_at: '', updated_at: '' },
    { id: 10, nguoi_dung_id: 1, danh_muc_id: 6,  so_tien: 200_000,    loai: 'chi', noi_dung: 'Khám bệnh định kỳ',   ngay_giao_dich: '2026-03-12', danh_muc: MOCK_DANH_MUC[5],  created_at: '', updated_at: '' },
    { id: 11, nguoi_dung_id: 1, danh_muc_id: 1,  so_tien: 65_000,     loai: 'chi', noi_dung: 'Cà phê sáng',         ngay_giao_dich: '2026-03-14', danh_muc: MOCK_DANH_MUC[0],  created_at: '', updated_at: '' },
    { id: 12, nguoi_dung_id: 1, danh_muc_id: 12, so_tien: 2_000_000,  loai: 'thu', noi_dung: 'Freelance design',    ngay_giao_dich: '2026-03-15', danh_muc: MOCK_DANH_MUC[11], created_at: '', updated_at: '' },
    { id: 13, nguoi_dung_id: 1, danh_muc_id: 7,  so_tien: 450_000,    loai: 'chi', noi_dung: 'Học tiếng Anh IELTS', ngay_giao_dich: '2026-03-16', danh_muc: MOCK_DANH_MUC[6],  created_at: '', updated_at: '' },
    { id: 14, nguoi_dung_id: 1, danh_muc_id: 2,  so_tien: 100_000,    loai: 'chi', noi_dung: 'Xăng xe',             ngay_giao_dich: '2026-03-17', danh_muc: MOCK_DANH_MUC[1],  created_at: '', updated_at: '' },
    { id: 15, nguoi_dung_id: 1, danh_muc_id: 1,  so_tien: 350_000,    loai: 'chi', noi_dung: 'Tiệc sinh nhật bạn',  ngay_giao_dich: '2026-03-19', danh_muc: MOCK_DANH_MUC[0],  created_at: '', updated_at: '' },
];

// ============================================================
// TỔNG QUAN TÀI CHÍNH
// ============================================================
export const MOCK_TONG_QUAN: TongQuanTaiChinh = {
    tong_thu:        17_500_000,
    tong_chi:         6_648_000,
    so_du:           10_852_000,
    so_giao_dich:    15,
    tang_truong_thu:  8.3,
    tang_truong_chi: -4.2,
};

// ============================================================
// THỐNG KÊ THEO DANH MỤC
// ============================================================
export const MOCK_THEO_DANH_MUC: ThongKeTheoDanhMuc[] = [
    { danh_muc: MOCK_DANH_MUC[0], tong_tien: 620_000,   so_giao_dich: 4, ty_le_phan_tram: 33.2 },
    { danh_muc: MOCK_DANH_MUC[7], tong_tien: 4_500_000, so_giao_dich: 1, ty_le_phan_tram: 22.3 },
    { danh_muc: MOCK_DANH_MUC[1], tong_tien: 150_000,   so_giao_dich: 2, ty_le_phan_tram: 9.1  },
    { danh_muc: MOCK_DANH_MUC[6], tong_tien: 450_000,   so_giao_dich: 1, ty_le_phan_tram: 8.4  },
    { danh_muc: MOCK_DANH_MUC[3], tong_tien: 350_000,   so_giao_dich: 1, ty_le_phan_tram: 7.6  },
    { danh_muc: MOCK_DANH_MUC[2], tong_tien: 299_000,   so_giao_dich: 1, ty_le_phan_tram: 6.8  },
    { danh_muc: MOCK_DANH_MUC[5], tong_tien: 200_000,   so_giao_dich: 1, ty_le_phan_tram: 5.2  },
    { danh_muc: MOCK_DANH_MUC[4], tong_tien: 79_000,    so_giao_dich: 1, ty_le_phan_tram: 4.1  },
];

// ============================================================
// BIỂU ĐỒ CHI TIÊU (7 ngày cuối)
// ============================================================
export const MOCK_BIEU_DO: BieuDoChiTieu[] = [
    { ngay: '2026-03-13', tong_thu: 0,          tong_chi: 0       },
    { ngay: '2026-03-14', tong_thu: 0,          tong_chi: 65_000  },
    { ngay: '2026-03-15', tong_thu: 2_000_000,  tong_chi: 0       },
    { ngay: '2026-03-16', tong_thu: 0,          tong_chi: 450_000 },
    { ngay: '2026-03-17', tong_thu: 0,          tong_chi: 100_000 },
    { ngay: '2026-03-18', tong_thu: 0,          tong_chi: 0       },
    { ngay: '2026-03-19', tong_thu: 0,          tong_chi: 350_000 },
];

// ============================================================
// SO SÁNH THEO THÁNG (năm 2026)
// ============================================================
export const MOCK_SO_SANH_THANG: SoSanhThang[] = [
    { thang: 1,  tong_thu: 15_000_000, tong_chi: 8_200_000, so_du: 6_800_000  },
    { thang: 2,  tong_thu: 16_500_000, tong_chi: 7_100_000, so_du: 9_400_000  },
    { thang: 3,  tong_thu: 17_500_000, tong_chi: 6_648_000, so_du: 10_852_000 },
];

// ============================================================
// NGÂN SÁCH (tháng 3/2026)
// ============================================================
export const MOCK_NGAN_SACH: NganSach[] = [
    { id: 1, nguoi_dung_id: 1, danh_muc_id: 1, so_tien_gioi_han: 1_500_000, thang: 3, nam: 2026, da_su_dung: 620_000,   phan_tram_su_dung: 41.3, danh_muc: MOCK_DANH_MUC[0], created_at: '', updated_at: '' },
    { id: 2, nguoi_dung_id: 1, danh_muc_id: 2, so_tien_gioi_han: 500_000,   thang: 3, nam: 2026, da_su_dung: 150_000,   phan_tram_su_dung: 30.0, danh_muc: MOCK_DANH_MUC[1], created_at: '', updated_at: '' },
    { id: 3, nguoi_dung_id: 1, danh_muc_id: 3, so_tien_gioi_han: 500_000,   thang: 3, nam: 2026, da_su_dung: 299_000,   phan_tram_su_dung: 59.8, danh_muc: MOCK_DANH_MUC[2], created_at: '', updated_at: '' },
    { id: 4, nguoi_dung_id: 1, danh_muc_id: 4, so_tien_gioi_han: 400_000,   thang: 3, nam: 2026, da_su_dung: 350_000,   phan_tram_su_dung: 87.5, danh_muc: MOCK_DANH_MUC[3], created_at: '', updated_at: '' },
    { id: 5, nguoi_dung_id: 1, danh_muc_id: 5, so_tien_gioi_han: 200_000,   thang: 3, nam: 2026, da_su_dung: 79_000,    phan_tram_su_dung: 39.5, danh_muc: MOCK_DANH_MUC[4], created_at: '', updated_at: '' },
    { id: 6, nguoi_dung_id: 1, danh_muc_id: 7, so_tien_gioi_han: 300_000,   thang: 3, nam: 2026, da_su_dung: 450_000,   phan_tram_su_dung: 150,  danh_muc: MOCK_DANH_MUC[6], created_at: '', updated_at: '' },
];

// ============================================================
// MỤC TIÊU TIẾT KIỆM
// ============================================================
export const MOCK_MUC_TIEU: MucTieuTietKiem[] = [
    { id: 1, nguoi_dung_id: 1, ten: 'Mua xe máy Honda Air Blade', mo_ta: 'Honda Air Blade 125cc bản đặc biệt',    so_tien_muc_tieu: 45_000_000, so_tien_hien_tai: 18_000_000, phan_tram_hoan_thanh: 40,   han_chot: '2026-12-31', trang_thai: 'dang_thuc_hien', created_at: '', updated_at: '' },
    { id: 2, nguoi_dung_id: 1, ten: 'Du lịch Nhật Bản',           mo_ta: 'Chuyến đi Tokyo + Osaka 10 ngày',      so_tien_muc_tieu: 30_000_000, so_tien_hien_tai: 12_500_000, phan_tram_hoan_thanh: 41.7, han_chot: '2026-09-01', trang_thai: 'dang_thuc_hien', created_at: '', updated_at: '' },
    { id: 3, nguoi_dung_id: 1, ten: 'Quỹ khẩn cấp 6 tháng',      mo_ta: 'Dự phòng chi phí sinh hoạt 6 tháng',  so_tien_muc_tieu: 50_000_000, so_tien_hien_tai: 32_000_000, phan_tram_hoan_thanh: 64,   han_chot: null,          trang_thai: 'dang_thuc_hien', created_at: '', updated_at: '' },
    { id: 4, nguoi_dung_id: 1, ten: 'MacBook Pro M4',             mo_ta: 'Laptop học tập + lập trình',           so_tien_muc_tieu: 50_000_000, so_tien_hien_tai: 50_000_000, phan_tram_hoan_thanh: 100,  han_chot: '2026-03-01', trang_thai: 'hoan_thanh',    created_at: '', updated_at: '' },
];

// ============================================================
// NHẮC NHỞ
// ============================================================
export const MOCK_NHAC_NHO: NhacNho[] = [
    { id: 1, nguoi_dung_id: 1, tieu_de: 'Trả tiền thuê nhà',       noi_dung: 'Chuyển khoản trước ngày 5',   ngay_nhac: '2026-04-02', gio_nhac: '09:00', lap_lai: 'hang_thang', trang_thai: true,  created_at: '', updated_at: '' },
    { id: 2, nguoi_dung_id: 1, tieu_de: 'Thanh toán Netflix',      noi_dung: '79.000đ/tháng',               ngay_nhac: '2026-04-10', gio_nhac: '10:00', lap_lai: 'hang_thang', trang_thai: true,  created_at: '', updated_at: '' },
    { id: 3, nguoi_dung_id: 1, tieu_de: 'Đóng tiền điện',          noi_dung: 'Kiểm tra hóa đơn EVN',        ngay_nhac: '2026-04-05', gio_nhac: '08:00', lap_lai: 'hang_thang', trang_thai: true,  created_at: '', updated_at: '' },
    { id: 4, nguoi_dung_id: 1, tieu_de: 'Học tiếng Anh',           noi_dung: null,                          ngay_nhac: '2026-03-20', gio_nhac: '19:00', lap_lai: 'hang_tuan',  trang_thai: true,  created_at: '', updated_at: '' },
    { id: 5, nguoi_dung_id: 1, tieu_de: 'Nạp tiền quỹ khẩn cấp',  noi_dung: 'Tiết kiệm 1tr/tháng',        ngay_nhac: '2026-04-01', gio_nhac: null,    lap_lai: 'hang_thang', trang_thai: false, created_at: '', updated_at: '' },
];
