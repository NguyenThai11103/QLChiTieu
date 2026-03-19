'use client';

import { NganSach } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface NganSachCardProps {
    nganSach: NganSach;
    onEdit: (ns: NganSach) => void;
    onDelete: (id: number) => void;
}

export function NganSachCard({ nganSach, onEdit, onDelete }: NganSachCardProps) {
    const percent = Math.min(nganSach.phan_tram_su_dung, 100);
    const isOverBudget = nganSach.da_su_dung > nganSach.so_tien_gioi_han;

    return (
        <div className="bg-card border rounded-xl p-4 space-y-3 hover:shadow-sm transition-shadow group">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                    <span
                        className="h-9 w-9 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                        style={{ backgroundColor: `${nganSach.danh_muc?.mau_sac || '#888'}20` }}
                    >
                        {nganSach.danh_muc?.bieu_tuong || '💰'}
                    </span>
                    <div>
                        <p className="font-semibold text-sm text-foreground">{nganSach.danh_muc?.ten || 'Danh mục'}</p>
                        <p className="text-xs text-muted-foreground">Giới hạn: {nganSach.so_tien_gioi_han.toLocaleString('vi-VN')} ₫</p>
                    </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(nganSach)}>
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => onDelete(nganSach.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className={cn("font-medium", isOverBudget ? 'text-destructive' : 'text-foreground')}>
                        Đã dùng: {nganSach.da_su_dung.toLocaleString('vi-VN')} ₫
                    </span>
                    <span className={cn("font-bold", isOverBudget ? 'text-destructive' : percent > 80 ? 'text-amber-500' : 'text-muted-foreground')}>
                        {percent.toFixed(0)}%
                    </span>
                </div>
                <Progress
                    value={percent}
                    className={cn("h-2", isOverBudget ? '[&>div]:bg-destructive' : percent > 80 ? '[&>div]:bg-amber-500' : '[&>div]:bg-primary')}
                />
                <p className="text-xs text-muted-foreground">
                    Còn lại: {Math.max(0, nganSach.so_tien_gioi_han - nganSach.da_su_dung).toLocaleString('vi-VN')} ₫
                </p>
            </div>
        </div>
    );
}
