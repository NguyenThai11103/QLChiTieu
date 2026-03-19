'use client';

import { useState } from "react";
import { MOCK_GIAO_DICH, MOCK_DANH_MUC } from "@/lib/mock-data";
import { useFinanceStore } from "@/store/finance.store";
import { GiaoDichList } from "@/components/giao-dich/GiaoDichList";
import { GiaoDichForm } from "@/components/giao-dich/GiaoDichForm";
import { MonthYearPicker } from "@/components/common/MonthYearPicker";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { GiaoDich, LoaiGiaoDich } from "@/types";
import { toast } from "sonner";

export default function GiaoDichPage() {
    const { activeTypeFilter, setTypeFilter } = useFinanceStore();
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<GiaoDich | null>(null);
    const [items, setItems] = useState(MOCK_GIAO_DICH);

    const filtered = activeTypeFilter
        ? items.filter(gd => gd.loai === activeTypeFilter)
        : items;

    const handleEdit = (gd: GiaoDich) => {
        setEditItem(gd);
        setOpen(true);
    };

    const handleDelete = (id: number) => {
        setItems(prev => prev.filter(gd => gd.id !== id));
        toast.success('Đã xoá giao dịch!');
    };

    const handleClose = () => {
        setOpen(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Giao Dịch</h1>
                    <p className="text-muted-foreground text-sm">Quản lý thu chi hàng ngày</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <MonthYearPicker />
                    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus className="h-4 w-4" />
                                Thêm giao dịch
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>{editItem ? 'Sửa giao dịch' : 'Thêm giao dịch mới'}</DialogTitle>
                            </DialogHeader>
                            <GiaoDichForm
                                editItem={editItem}
                                danhMucList={MOCK_DANH_MUC}
                                onSuccess={handleClose}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                <Select
                    value={activeTypeFilter ?? 'all'}
                    onValueChange={(v) => setTypeFilter(v === 'all' ? null : v as LoaiGiaoDich)}
                >
                    <SelectTrigger className="w-36">
                        <SelectValue placeholder="Loại" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả</SelectItem>
                        <SelectItem value="thu">Thu</SelectItem>
                        <SelectItem value="chi">Chi</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <GiaoDichList
                items={filtered}
                isLoading={false}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}
