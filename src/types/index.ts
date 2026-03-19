// ============================================================
// API Response Types — match qlchitieu-be ApiResponse helper
// ============================================================

export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
}

export interface PaginatedResponse<T> {
    success: boolean
    message: string
    data: T[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        total: number
        from: number | null
        to: number | null
    }
    links: {
        first: string
        last: string
        prev: string | null
        next: string | null
    }
}

export interface ValidationErrors {
    [field: string]: string[]
}

// ============================================================
// Auth Types — match BE nguoi_dung table
// ============================================================

export interface User {
    id: number
    ho_va_ten: string
    email: string
    so_dien_thoai: string | null
    anh_dai_dien: string | null
    vai_tro: 'quan_tri' | 'nguoi_dung'
    trang_thai: boolean
    email_verified_at: string | null
    created_at: string
    updated_at: string
}

export interface LoginRequest {
    email: string
    mat_khau: string
}

export interface RegisterRequest {
    ho_va_ten: string
    email: string
    mat_khau: string
    mat_khau_confirmation: string
    so_dien_thoai?: string
}

export interface AuthResponse {
    user: User
    token: string
}

// ============================================================
// DanhMuc Types — match BE danh_muc table
// ============================================================

export type LoaiDanhMuc = 'thu' | 'chi'

export interface DanhMuc {
    id: number
    ten: string
    bieu_tuong: string          // emoji icon, e.g. "🍔"
    mau_sac: string             // hex color, e.g. "#22c55e"
    loai: LoaiDanhMuc
    danh_muc_cha_id: number | null
    children?: DanhMuc[]
    tong_giao_dich?: number     // optional: số giao dịch trong tháng
    tong_chi_tieu?: number      // optional: tổng tiền trong tháng
}

export interface CreateDanhMucRequest {
    ten: string
    bieu_tuong: string
    mau_sac: string
    loai: LoaiDanhMuc
    danh_muc_cha_id?: number
}

// ============================================================
// GiaoDich Types — match BE giao_dich table
// ============================================================

export type LoaiGiaoDich = 'thu' | 'chi'

export interface GiaoDich {
    id: number
    nguoi_dung_id: number
    danh_muc_id: number
    so_tien: number
    loai: LoaiGiaoDich
    noi_dung: string | null
    ngay_giao_dich: string      // YYYY-MM-DD
    danh_muc?: DanhMuc
    created_at: string
    updated_at: string
}

export interface CreateGiaoDichRequest {
    danh_muc_id: number
    so_tien: number
    loai: LoaiGiaoDich
    noi_dung?: string
    ngay_giao_dich: string
}

export interface GetGiaoDichParams {
    page?: number
    limit?: number
    loai?: LoaiGiaoDich
    danh_muc_id?: number
    tu_ngay?: string            // YYYY-MM-DD
    den_ngay?: string           // YYYY-MM-DD
    thang?: number
    nam?: number
}

// ============================================================
// NganSach Types — match BE ngan_sach table
// ============================================================

export interface NganSach {
    id: number
    nguoi_dung_id: number
    danh_muc_id: number
    so_tien_gioi_han: number
    thang: number               // 1-12
    nam: number
    da_su_dung: number          // tính toán từ BE
    phan_tram_su_dung: number   // tính toán từ BE
    danh_muc?: DanhMuc
    created_at: string
    updated_at: string
}

export interface CreateNganSachRequest {
    danh_muc_id: number
    so_tien_gioi_han: number
    thang: number
    nam: number
}

// ============================================================
// MucTieuTietKiem Types — match BE muc_tieu_tiet_kiem table
// ============================================================

export type TrangThaiMucTieu = 'dang_thuc_hien' | 'hoan_thanh' | 'da_huy'

export interface MucTieuTietKiem {
    id: number
    nguoi_dung_id: number
    ten: string
    mo_ta: string | null
    so_tien_muc_tieu: number
    so_tien_hien_tai: number
    phan_tram_hoan_thanh: number    // tính toán từ BE
    han_chot: string | null         // YYYY-MM-DD
    trang_thai: TrangThaiMucTieu
    created_at: string
    updated_at: string
}

export interface CreateMucTieuRequest {
    ten: string
    mo_ta?: string
    so_tien_muc_tieu: number
    han_chot?: string
}

export interface NapTienRequest {
    so_tien: number
    ghi_chu?: string
}

// ============================================================
// NhacNho Types — match BE nhac_nho table
// ============================================================

export type LapLaiNhacNho = 'mot_lan' | 'hang_ngay' | 'hang_tuan' | 'hang_thang'

export interface NhacNho {
    id: number
    nguoi_dung_id: number
    tieu_de: string
    noi_dung: string | null
    ngay_nhac: string           // YYYY-MM-DD
    gio_nhac: string | null     // HH:mm
    lap_lai: LapLaiNhacNho
    trang_thai: boolean         // true = bật, false = tắt
    created_at: string
    updated_at: string
}

export interface CreateNhacNhoRequest {
    tieu_de: string
    noi_dung?: string
    ngay_nhac: string
    gio_nhac?: string
    lap_lai: LapLaiNhacNho
}

// ============================================================
// ThongKe Types — match BE thong_ke endpoints
// ============================================================

export interface TongQuanTaiChinh {
    tong_thu: number
    tong_chi: number
    so_du: number
    so_giao_dich: number
    tang_truong_thu: number     // % so với tháng trước
    tang_truong_chi: number     // % so với tháng trước
}

export interface ThongKeTheoDanhMuc {
    danh_muc: DanhMuc
    tong_tien: number
    so_giao_dich: number
    ty_le_phan_tram: number
}

export interface BieuDoChiTieu {
    ngay: string                // YYYY-MM-DD
    tong_thu: number
    tong_chi: number
}

export interface SoSanhThang {
    thang: number
    tong_thu: number
    tong_chi: number
    so_du: number
}

// ============================================================
// Notification Types
// ============================================================

export interface Notification {
    id: number
    loai: string
    tieu_de: string
    noi_dung: string | null
    du_lieu_them: Record<string, unknown> | null
    da_doc_luc: string | null
    created_at: string
}
