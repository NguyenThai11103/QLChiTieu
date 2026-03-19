'use client';

import { GiaoDich } from "@/types";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { Pencil, Trash2, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GiaoDichListProps {
    items: GiaoDich[];
    isLoading: boolean;
    onEdit: (gd: GiaoDich) => void;
    onDelete: (id: number) => void;
}

export function GiaoDichList({ items, isLoading, onEdit, onDelete }: GiaoDichListProps) {
    if (isLoading) {
        return (
            <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-16 bg-muted animate-pulse rounded-xl" />
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="text-center py-16 text-muted-foreground">
                <p className="text-4xl mb-3">💸</p>
                <p>Chưa có giao dịch nào trong tháng này.</p>
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
                const dailyTotal = gds.reduce((s, gd) => gd.loai === 'thu' ? s + gd.so_tien : s - gd.so_tien, 0);
                return (
                    <div key={date}>
                        <div className="flex items-center justify-between mb-2 px-1">
                            <span className="text-sm font-semibold text-muted-foreground">
                                {format(parseISO(date), 'dd/MM/yyyy')}
                            </span>
                            <span className={cn("text-sm font-bold", dailyTotal >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                                {dailyTotal >= 0 ? '+' : ''}{dailyTotal.toLocaleString('vi-VN')} ₫
                            </span>
                        </div>
                        <div className="space-y-2">
                            {gds.map(gd => (
                                <div key={gd.id} className="flex items-center gap-3 bg-card rounded-xl border p-3 group">
                                    <div
                                        className="h-10 w-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                                        style={{ backgroundColor: `${gd.danh_muc?.mau_sac || '#888'}20` }}
                                    >
                                        {gd.danh_muc?.bieu_tuong || '💰'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground truncate">
                                            {gd.noi_dung || gd.danh_muc?.ten || 'Giao dịch'}
                                        </p>
                                        {gd.danh_muc && (
                                            <p className="text-xs text-muted-foreground">{gd.danh_muc.ten}</p>
                                        )}
                                    </div>
                                    <div className={cn("flex items-center gap-1 mr-2", gd.loai === 'thu' ? 'text-emerald-600' : 'text-red-500')}>
                                        {gd.loai === 'thu' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        <span className="text-sm font-bold">
                                            {gd.loai === 'thu' ? '+' : '-'}{gd.so_tien.toLocaleString('vi-VN')} ₫
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(gd)}>
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>
                                        <Button
                                            variant="ghost" size="icon"
                                            className="h-7 w-7 text-destructive hover:text-destructive"
                                            onClick={() => onDelete(gd.id)}
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
