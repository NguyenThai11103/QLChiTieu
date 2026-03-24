// ============================================================
// API Response Types
// ============================================================

export interface ApiResponse<T> {
    status: number
    message?: string
    data?: T
}

export interface PaginatedResponse<T> {
    status: number
    message?: string
    data: T[]
}

export interface ValidationErrors {
    [field: string]: string[]
}

// ============================================================
// Auth Types
// ============================================================

export interface User {
    id: number
    ho_ten: string
    email: string
    so_dien_thoai: string | null
    avatar: string | null
    created_at?: string
    updated_at?: string
}

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    ho_ten: string
    email: string
    password: string
    so_dien_thoai?: string
}

export type AuthResponse = User;

// ============================================================
// DanhMuc Types
// ============================================================

export type LoaiDanhMuc = 'thu' | 'chi'

export interface DanhMuc {
    id: number
    ten_danh_muc: string
    loai: LoaiDanhMuc
    created_at?: string
    updated_at?: string
}

export interface CreateDanhMucRequest {
    ten_danh_muc: string
    loai: LoaiDanhMuc
}

// ============================================================
// GiaoDich Types
// ============================================================

export type LoaiGiaoDich = 'thu' | 'chi'

export interface GetGiaoDichParams {
    thang?: number | null;
    nam?: number | null;
    loai?: LoaiGiaoDich | null;
    id_danh_muc?: number | null;
    [key: string]: any;
}

export interface GiaoDich {
    id: number
    id_nguoi_dung: number
    id_danh_muc: number
    so_tien: number
    loai: LoaiGiaoDich
    noi_dung: string | null
    danh_muc?: DanhMuc
    created_at?: string
    updated_at?: string
}

export interface CreateGiaoDichRequest {
    id_danh_muc: number
    so_tien: number
    loai: LoaiGiaoDich
    noi_dung?: string
}

// ============================================================
// NganSach Types
// ============================================================

export interface NganSach {
    id: number
    id_nguoi_dung: number
    id_danh_muc: number
    so_tien_ngan_sach: number
    thang: number
    da_su_dung?: number
    phan_tram_su_dung?: number
    danh_muc?: DanhMuc
    created_at?: string
    updated_at?: string
}

export interface CreateNganSachRequest {
    id_danh_muc: number
    so_tien_ngan_sach: number
    thang: number
}

// ============================================================
// MucTieuTietKiem Types
// ============================================================

export interface MucTieuTietKiem {
    id: number
    id_nguoi_dung: number
    ten_muc_tieu: string
    so_tien_muc_tieu: number
    so_tien_hien_tai: number
    phan_tram_hoan_thanh?: number
    created_at?: string
    updated_at?: string
}

export interface CreateMucTieuRequest {
    ten_muc_tieu: string
    so_tien_muc_tieu: number
}

export interface NapTienRequest {
    so_tien: number
}

// ============================================================
// NhacNho Types
// ============================================================

export interface NhacNho {
    id: number
    id_nguoi_dung: number
    tieu_de: string
    so_tien: number
    created_at?: string
    updated_at?: string
}

export interface CreateNhacNhoRequest {
    tieu_de: string
    so_tien: number
}

// ============================================================
// ThongKe Types
// ============================================================

export interface TongQuanTaiChinh {
    tong_thu: number
    tong_chi: number
    so_du: number
    so_giao_dich: number
}

export interface ThongKeTheoDanhMuc {
    danh_muc: DanhMuc
    tong_tien: number
    so_giao_dich: number
    ty_le_phan_tram: number
}

export interface BieuDoChiTieu {
    ngay: string
    tong_thu: number
    tong_chi: number
}

export interface SoSanhThang {
    thang: number
    tong_thu: number
    tong_chi: number
    so_du: number
}
