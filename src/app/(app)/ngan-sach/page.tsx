'use client';

import { useState } from "react";
// Remove mock data
import { NganSachCard } from "@/components/ngan-sach/NganSachCard";
import { NganSachForm } from "@/components/ngan-sach/NganSachForm";
import { MonthYearPicker } from "@/components/common/MonthYearPicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { NganSach } from "@/types";
import { useNganSach, useDeleteNganSach } from "@/hooks/useNganSach";
import { useFinanceStore } from "@/store/finance.store";

export default function NganSachPage() {
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<NganSach | null>(null);
    const { selectedMonth, selectedYear } = useFinanceStore();

    const { data: items = [], isLoading } = useNganSach(selectedMonth, selectedYear);
    const deleteNS = useDeleteNganSach();

    const tongGioiHan = items.reduce((s, ns) => s + Number(ns.so_tien_ngan_sach || 0), 0);
    const tongDaSuDung = items.reduce((s, ns) => s + Number(ns.da_su_dung || 0), 0);

    const handleEdit = (ns: NganSach) => {
        setEditItem(ns);
        setOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc xoá ngân sách này?')) {
            await deleteNS.mutateAsync(id);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Ngân Sách</h1>
                    <p className="text-muted-foreground text-sm">Kiểm soát chi tiêu theo danh mục</p>
                </div>
                <div className="flex items-center gap-2">
                    <MonthYearPicker />
                    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Thêm
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>{editItem ? 'Sửa ngân sách' : 'Thêm ngân sách mới'}</DialogTitle>
                            </DialogHeader>
                            <NganSachForm
                                editItem={editItem}
                                defaultThang={selectedMonth}
                                onSuccess={handleClose}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl border p-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Tổng giới hạn</p>
                    <p className="text-xl font-bold">{tongGioiHan.toLocaleString('vi-VN')} ₫</p>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Đã sử dụng</p>
                    <p className="text-xl font-bold text-destructive">{tongDaSuDung.toLocaleString('vi-VN')} ₫</p>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Còn lại</p>
                    <p className="text-xl font-bold text-primary">{Math.max(0, tongGioiHan - tongDaSuDung).toLocaleString('vi-VN')} ₫</p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
            ) : items.length === 0 ? (
                <div className="text-center py-20" style={{ color: 'var(--muted-foreground)' }}>
                    <p className="text-sm">Chưa có ngân sách nào cho tháng này.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {items.map(ns => (
                        <NganSachCard key={ns.id} nganSach={ns} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
}
