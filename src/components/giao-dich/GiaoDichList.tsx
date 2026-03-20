'use client';

import { GiaoDich } from "@/types";
import { format, parseISO } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

interface GiaoDichListProps {
    items: GiaoDich[];
    isLoading: boolean;
    onEdit: (gd: GiaoDich) => void;
    onDelete: (id: number) => void;
}

export function GiaoDichList({ items, isLoading, onEdit, onDelete }: GiaoDichListProps) {
    if (isLoading) {
        return (
            <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 animate-pulse rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }} />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-20" style={{ color: 'var(--muted-foreground)' }}>
                <p className="text-4xl mb-3">💸</p>
                <p className="text-sm">Chưa có giao dịch nào trong tháng này.</p>
            </div>
        );
    }

    // Group by date
    const grouped = items.reduce((acc, gd) => {
        const date = gd.ngay_giao_dich;
        if (!acc[date]) acc[date] = [];
        acc[date].push(gd);
        return acc;
    }, {} as Record<string, GiaoDich[]>);

    return (
        <div className="space-y-6">
            {Object.entries(grouped).sort(([a], [b]) => b.localeCompare(a)).map(([date, gds]) => {
                const dailyNet = gds.reduce((s, gd) => gd.loai === 'thu' ? s + gd.so_tien : s - gd.so_tien, 0);
                return (
                    <div key={date}>
                        {/* Date header */}
                        <div className="flex items-center justify-between mb-2 px-1">
                            <div className="flex items-center gap-2">
                                <div className="h-0.5 w-6 rounded-full" style={{ background: 'rgba(255,255,255,0.12)' }} />
                                <span className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                                    {format(parseISO(date), 'dd/MM/yyyy')}
                                </span>
                            </div>
                            <span className="text-xs font-black" style={{ color: dailyNet >= 0 ? '#10b981' : '#ef4444' }}>
                                {dailyNet >= 0 ? '+' : ''}{dailyNet.toLocaleString('vi-VN')} ₫
                            </span>
                        </div>

                        {/* Transactions */}
                        <div className="space-y-1.5">
                            {gds.map(gd => {
                                const isIncome = gd.loai === 'thu';
                                const color = gd.danh_muc?.mau_sac || (isIncome ? '#10b981' : '#ef4444');
                                return (
                                    <div key={gd.id}
                                        className="flex items-center gap-3 px-4 py-3 rounded-2xl group transition-all hover:bg-white/5 cursor-default"
                                        style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.05)' }}
                                    >
                                        {/* Category icon */}
                                        <div className="h-10 w-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                            style={{ background: `${color}18`, border: `1px solid ${color}25` }}
                                        >
                                            {gd.danh_muc?.bieu_tuong || '💰'}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                                                {gd.noi_dung || gd.danh_muc?.ten || 'Giao dịch'}
                                            </p>
                                            {gd.danh_muc && (
                                                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{gd.danh_muc.ten}</p>
                                            )}
                                        </div>

                                        {/* Amount */}
                                        <div className="text-right mr-2 flex-shrink-0">
                                            <p className="text-sm font-black" style={{ color: isIncome ? '#10b981' : '#ef4444' }}>
                                                {isIncome ? '+' : '-'}{gd.so_tien.toLocaleString('vi-VN')} ₫
                                            </p>
                                        </div>

                                        {/* Actions (hover) */}
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                            <button
                                                onClick={() => onEdit(gd)}
                                                className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                                                style={{ color: 'var(--muted-foreground)' }}
                                            >
                                                <Pencil className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                onClick={() => onDelete(gd.id)}
                                                className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/20 hover:text-red-400"
                                                style={{ color: 'var(--muted-foreground)' }}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
