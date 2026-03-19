'use client';

import { MucTieuTietKiem } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface MucTieuCardProps {
    mucTieu: MucTieuTietKiem;
    onEdit: (mt: MucTieuTietKiem) => void;
    onDelete: (id: number) => void;
    onNapTien: (mt: MucTieuTietKiem) => void;
}

export function MucTieuCard({ mucTieu, onEdit, onDelete, onNapTien }: MucTieuCardProps) {
    const percent = Math.min(mucTieu.phan_tram_hoan_thanh, 100);
    const isComplete = mucTieu.trang_thai === 'hoan_thanh';

    return (
        <div className={cn("bg-card border rounded-xl p-4 space-y-3 group hover:shadow-sm transition-shadow", isComplete && 'opacity-75')}>
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        {isComplete && <Trophy className="h-4 w-4 text-amber-500 flex-shrink-0" />}
                        <p className="font-semibold text-sm text-foreground truncate">{mucTieu.ten}</p>
                    </div>
                    {mucTieu.mo_ta && <p className="text-xs text-muted-foreground mt-0.5 truncate">{mucTieu.mo_ta}</p>}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(mucTieu)}>
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => onDelete(mucTieu.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{mucTieu.so_tien_hien_tai.toLocaleString('vi-VN')} ₫</span>
                    <span className="font-bold text-primary">{percent.toFixed(0)}%</span>
                </div>
                <Progress value={percent} className={cn("h-2.5", isComplete && '[&>div]:bg-amber-500')} />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Mục tiêu: {mucTieu.so_tien_muc_tieu.toLocaleString('vi-VN')} ₫</span>
                    {mucTieu.han_chot && (
                        <Badge variant="outline" className="text-xs">
                            HĐ: {format(parseISO(mucTieu.han_chot), 'dd/MM/yy')}
                        </Badge>
                    )}
                </div>
            </div>

            {!isComplete && (
                <Button variant="outline" size="sm" className="w-full gap-1 h-8 text-xs" onClick={() => onNapTien(mucTieu)}>
                    <Plus className="h-3.5 w-3.5" />
                    Nạp tiền
                </Button>
            )}
        </div>
    );
}
