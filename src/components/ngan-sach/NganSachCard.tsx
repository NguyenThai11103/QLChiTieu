'use client';

import { NganSach } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

interface NganSachCardProps {
    nganSach: NganSach;
    onEdit: (ns: NganSach) => void;
    onDelete: (id: number) => void;
}

export function NganSachCard({ nganSach, onEdit, onDelete }: NganSachCardProps) {
    const daDung = nganSach.da_su_dung || 0;
    const gioiHan = nganSach.so_tien_ngan_sach || 1;
    const percent = Math.min((daDung / gioiHan) * 100, 100) || 0;
    
    const isOver = daDung > nganSach.so_tien_ngan_sach;
    const isWarning = percent > 80 && !isOver;

    const barColor = isOver ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981';
    const tenDM = nganSach.danh_muc?.ten_danh_muc || 'Danh mục';

    return (
        <div className="rounded-2xl p-4 group transition-all hover:bg-white/5"
            style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-lg bg-muted border border-border">
                        {tenDM.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground">{tenDM}</p>
                        <p className="text-xs text-muted-foreground">
                            Tháng {nganSach.thang}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(nganSach)}
                        className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-muted-foreground"
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => onDelete(nganSach.id)}
                        className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all text-muted-foreground"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="h-2 rounded-full overflow-hidden bg-white/5">
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%`, background: barColor, boxShadow: `0 0 8px ${barColor}60` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-muted-foreground">Đã dùng</p>
                        <p className="text-sm font-bold" style={{ color: barColor }}>
                            {daDung.toLocaleString('vi-VN')} ₫
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Giới hạn</p>
                        <p className="text-sm font-bold text-foreground">
                            {Number(nganSach.so_tien_ngan_sach).toLocaleString('vi-VN')} ₫
                        </p>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `${barColor}18`, color: barColor }}
                    >
                        {isOver ? '⚠ Vượt ngân sách' : isWarning ? '⚡ Gần hết' : `✓ ${percent.toFixed(0)}% đã dùng`}
                    </span>
                    <span className="text-xs font-semibold text-emerald-500">
                        Còn: {Math.max(0, Number(nganSach.so_tien_ngan_sach) - daDung).toLocaleString('vi-VN')} ₫
                    </span>
                </div>
            </div>
        </div>
    );
}
