'use client';

import { NganSach } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

interface NganSachCardProps {
    nganSach: NganSach;
    onEdit: (ns: NganSach) => void;
    onDelete: (id: number) => void;
}

export function NganSachCard({ nganSach, onEdit, onDelete }: NganSachCardProps) {
    const percent = Math.min(nganSach.phan_tram_su_dung, 100);
    const isOver = nganSach.da_su_dung > nganSach.so_tien_gioi_han;
    const isWarning = percent > 80 && !isOver;

    const barColor = isOver ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981';
    const color = nganSach.danh_muc?.mau_sac || '#10b981';

    return (
        <div className="rounded-2xl p-4 group transition-all hover:bg-white/5"
            style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl flex items-center justify-center text-lg"
                        style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                    >
                        {nganSach.danh_muc?.bieu_tuong || '💰'}
                    </div>
                    <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>{nganSach.danh_muc?.ten || 'Danh mục'}</p>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                            Tháng {nganSach.thang}/{nganSach.nam}
                        </p>
                    </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onEdit(nganSach)}
                        className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all"
                        style={{ color: 'var(--muted-foreground)' }}
                    >
                        <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => onDelete(nganSach.id)}
                        className="h-7 w-7 rounded-lg flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all"
                        style={{ color: 'var(--muted-foreground)' }}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%`, background: barColor, boxShadow: `0 0 8px ${barColor}60` }}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Đã dùng</p>
                        <p className="text-sm font-bold" style={{ color: barColor }}>
                            {nganSach.da_su_dung.toLocaleString('vi-VN')} ₫
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Giới hạn</p>
                        <p className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
                            {nganSach.so_tien_gioi_han.toLocaleString('vi-VN')} ₫
                        </p>
                    </div>
                </div>

                {/* Status badge */}
                <div className="flex justify-between items-center pt-1">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{ background: `${barColor}18`, color: barColor }}
                    >
                        {isOver ? '⚠ Vượt ngân sách' : isWarning ? '⚡ Gần hết' : `✓ ${percent.toFixed(0)}% đã dùng`}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: '#10b981' }}>
                        Còn: {Math.max(0, nganSach.so_tien_gioi_han - nganSach.da_su_dung).toLocaleString('vi-VN')} ₫
                    </span>
                </div>
            </div>
        </div>
    );
}
