'use client';

import { MucTieuTietKiem } from "@/types";
import { Pencil, Trash2, Plus, Trophy } from "lucide-react";

interface MucTieuCardProps {
    mucTieu: MucTieuTietKiem;
    onEdit: (mt: MucTieuTietKiem) => void;
    onDelete: (id: number) => void;
    onNapTien: (mt: MucTieuTietKiem) => void;
}

export function MucTieuCard({ mucTieu, onEdit, onDelete, onNapTien }: MucTieuCardProps) {
    const soTienHT = mucTieu.so_tien_hien_tai || 0;
    const soTienMT = mucTieu.so_tien_muc_tieu || 1;
    const percent = Math.min((soTienHT / soTienMT) * 100, 100) || 0;
    const isComplete = soTienHT >= soTienMT;
    const barColor = isComplete ? '#f59e0b' : '#10b981';

    return (
        <div className="rounded-2xl p-4 group transition-all hover:bg-white/5"
            style={{
                background: isComplete
                    ? 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.03))'
                    : 'var(--card)',
                border: isComplete ? '1px solid rgba(245,158,11,0.2)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                opacity: isComplete ? 0.85 : 1,
            }}
        >
            <div className="flex items-start gap-2 mb-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        {isComplete && <Trophy className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />}
                        <p className="text-sm font-bold truncate text-foreground">{mucTieu.ten_muc_tieu}</p>
                    </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button onClick={() => onEdit(mucTieu)}
                        className="h-6 w-6 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-muted-foreground"
                    >
                        <Pencil className="h-3 w-3" />
                    </button>
                    <button onClick={() => onDelete(mucTieu.id)}
                        className="h-6 w-6 rounded-lg flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 transition-all text-muted-foreground"
                    >
                        <Trash2 className="h-3 w-3" />
                    </button>
                </div>
            </div>

            <div className="space-y-2 mb-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                    <span>
                        {soTienHT.toLocaleString('vi-VN')} ₫
                    </span>
                    <span className="font-black" style={{ color: barColor }}>{percent.toFixed(0)}%</span>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden bg-white/5">
                    <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%`, background: barColor, boxShadow: `0 0 8px ${barColor}60` }}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                        Mục tiêu: {Number(mucTieu.so_tien_muc_tieu).toLocaleString('vi-VN')} ₫
                    </span>
                </div>
            </div>

            {!isComplete && (
                <button
                    onClick={() => onNapTien(mucTieu)}
                    className="w-full h-8 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold transition-all hover:opacity-80"
                    style={{
                        background: 'rgba(16,185,129,0.12)',
                        color: '#10b981',
                        border: '1px solid rgba(16,185,129,0.2)',
                    }}
                >
                    <Plus className="h-3.5 w-3.5" />
                    Nạp tiền vào quỹ
                </button>
            )}
        </div>
    );
}
