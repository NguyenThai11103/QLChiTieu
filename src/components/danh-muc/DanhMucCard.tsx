'use client';

import { DanhMuc } from "@/types";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DanhMucCardProps {
    danhMuc: DanhMuc;
    onEdit: (dm: DanhMuc) => void;
    onDelete: (id: number) => void;
}

export function DanhMucCard({ danhMuc, onEdit, onDelete }: DanhMucCardProps) {
    const firstLetter = danhMuc.ten_danh_muc ? danhMuc.ten_danh_muc.charAt(0).toUpperCase() : '?';

    return (
        <div className="group relative bg-card border rounded-xl p-4 flex flex-col items-center gap-2 text-center hover:shadow-md transition-shadow">
            <div
                className="h-12 w-12 rounded-full flex items-center justify-center text-2xl bg-muted border-2 border-border"
            >
                {firstLetter}
            </div>
            <p className="text-sm font-semibold text-foreground leading-tight">{danhMuc.ten_danh_muc}</p>

            {/* Hover actions */}
            <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(danhMuc)}>
                    <Pencil className="h-3 w-3" />
                </Button>
                <Button
                    variant="ghost" size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive"
                    onClick={() => onDelete(danhMuc.id)}
                >
                    <Trash2 className="h-3 w-3" />
                </Button>
            </div>
        </div>
    );
}
