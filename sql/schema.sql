-- ============================================================
-- QLChiTieu — Schema MySQL
-- Chạy lệnh: mysql -u root -p < sql/schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS qlchitieu CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE qlchitieu;

-- -----------------------------------------------------------
-- NGƯỜI DÙNG
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS nguoi_dung (
    id            INT          AUTO_INCREMENT PRIMARY KEY,
    ten           VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    mat_khau      VARCHAR(255) NOT NULL,
    anh_dai_dien  VARCHAR(500) NULL,
    vai_tro       ENUM('user','admin') NOT NULL DEFAULT 'user',
    ngay_tao      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------
-- DANH MỤC (có bieu_tuong, mau_sac cho FE)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS danh_muc (
    id              INT          AUTO_INCREMENT PRIMARY KEY,
    ten_danh_muc    VARCHAR(100) NOT NULL,
    loai            ENUM('thu','chi') NOT NULL,
    bieu_tuong      VARCHAR(10)  NOT NULL DEFAULT '💰',
    mau_sac         VARCHAR(10)  NOT NULL DEFAULT '#10b981',
    danh_muc_cha_id INT          NULL REFERENCES danh_muc(id),
    ngay_tao        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------
-- GIAO DỊCH
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS giao_dich (
    id              INT            AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id   INT            NOT NULL,
    danh_muc_id     INT            NULL,
    so_tien         DECIMAL(18,0)  NOT NULL,
    loai            ENUM('thu','chi') NOT NULL,
    noi_dung        TEXT           NULL,
    ngay_giao_dich  DATE           NOT NULL,
    ngay_tao        TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
    FOREIGN KEY (danh_muc_id)   REFERENCES danh_muc(id)   ON DELETE SET NULL
);

-- -----------------------------------------------------------
-- NGÂN SÁCH
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS ngan_sach (
    id                INT            AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id     INT            NOT NULL,
    danh_muc_id       INT            NOT NULL,
    so_tien_ngan_sach DECIMAL(18,0)  NOT NULL,
    thang             TINYINT        NOT NULL,
    nam               SMALLINT       NOT NULL,
    UNIQUE KEY uk_ngan_sach (nguoi_dung_id, danh_muc_id, thang, nam),
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE,
    FOREIGN KEY (danh_muc_id)   REFERENCES danh_muc(id)   ON DELETE CASCADE
);

-- -----------------------------------------------------------
-- MỤC TIÊU TIẾT KIỆM
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS muc_tieu_tiet_kiem (
    id                INT            AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id     INT            NOT NULL,
    ten_muc_tieu      VARCHAR(200)   NOT NULL,
    mo_ta             TEXT           NULL,
    so_tien_muc_tieu  DECIMAL(18,0)  NOT NULL,
    so_tien_hien_tai  DECIMAL(18,0)  NOT NULL DEFAULT 0,
    han_hoan_thanh    DATE           NULL,
    trang_thai        ENUM('dang_thuc_hien','hoan_thanh','huy') NOT NULL DEFAULT 'dang_thuc_hien',
    ngay_tao          TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE
);

-- -----------------------------------------------------------
-- NHẮC NHỞ
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS nhac_nho (
    id              INT          AUTO_INCREMENT PRIMARY KEY,
    nguoi_dung_id   INT          NOT NULL,
    tieu_de         VARCHAR(200) NOT NULL,
    noi_dung        TEXT         NULL,
    so_tien         DECIMAL(18,0) NULL,
    ngay_nhac       DATE         NOT NULL,
    gio_nhac        TIME         NULL,
    lap_lai         ENUM('mot_lan','hang_ngay','hang_tuan','hang_thang','hang_nam') NOT NULL DEFAULT 'mot_lan',
    trang_thai      TINYINT(1)   NOT NULL DEFAULT 1,
    ngay_tao        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (nguoi_dung_id) REFERENCES nguoi_dung(id) ON DELETE CASCADE
);

-- -----------------------------------------------------------
-- NHÃN (tags)
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS nhan (
    id          INT          AUTO_INCREMENT PRIMARY KEY,
    ten_nhan    VARCHAR(50)  NOT NULL
);

CREATE TABLE IF NOT EXISTS giao_dich_nhan (
    giao_dich_id INT NOT NULL,
    nhan_id      INT NOT NULL,
    PRIMARY KEY (giao_dich_id, nhan_id),
    FOREIGN KEY (giao_dich_id) REFERENCES giao_dich(id) ON DELETE CASCADE,
    FOREIGN KEY (nhan_id)      REFERENCES nhan(id)       ON DELETE CASCADE
);

-- -----------------------------------------------------------
-- SEED — Danh mục mặc định
-- -----------------------------------------------------------
INSERT IGNORE INTO danh_muc (ten_danh_muc, loai, bieu_tuong, mau_sac) VALUES
  ('Ăn uống',    'chi', '🍔', '#f59e0b'),
  ('Di chuyển',  'chi', '🚌', '#3b82f6'),
  ('Mua sắm',    'chi', '🛒', '#ec4899'),
  ('Hóa đơn',    'chi', '💡', '#8b5cf6'),
  ('Giải trí',   'chi', '🎮', '#06b6d4'),
  ('Sức khỏe',   'chi', '💊', '#22c55e'),
  ('Giáo dục',   'chi', '📚', '#f97316'),
  ('Nhà ở',      'chi', '🏠', '#64748b'),
  ('Lương',      'thu', '💰', '#22c55e'),
  ('Thưởng',     'thu', '🎁', '#f59e0b'),
  ('Đầu tư',     'thu', '📈', '#3b82f6'),
  ('Làm thêm',   'thu', '💼', '#8b5cf6');
