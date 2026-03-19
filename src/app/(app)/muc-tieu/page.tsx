'use client';

import { useState } from "react";
import { MOCK_MUC_TIEU } from "@/lib/mock-data";
import { MucTieuCard } from "@/components/muc-tieu/MucTieuCard";
import { MucTieuForm } from "@/components/muc-tieu/MucTieuForm";
import { NapTienDialog } from "@/components/muc-tieu/NapTienDialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Target } from "lucide-react";
import { MucTieuTietKiem } from "@/types";
import { toast } from "sonner";

export default function MucTieuPage() {
    const [formOpen, setFormOpen] = useState(false);
    const [editItem, setEditItem] = useState<MucTieuTietKiem | null>(null);
    const [napTienItem, setNapTienItem] = useState<MucTieuTietKiem | null>(null);
    const [items, setItems] = useState(MOCK_MUC_TIEU);

    const dangThucHien = items.filter(mt => mt.trang_thai === 'dang_thuc_hien');
    const hoanThanh = items.filter(mt => mt.trang_thai === 'hoan_thanh');

    const handleEdit = (mt: MucTieuTietKiem) => {
        setEditItem(mt);
        setFormOpen(true);
    };

    const handleDelete = (id: number) => {
        setItems(prev => prev.filter(mt => mt.id !== id));
        toast.success('Đã xoá mục tiêu!');
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Mục Tiêu Tiết Kiệm</h1>
                    <p className="text-muted-foreground text-sm">Theo dõi tiến độ tiết kiệm của bạn</p>
                </div>
                <Dialog open={formOpen} onOpenChange={(v) => { if (!v) handleCloseForm(); else setFormOpen(true); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Thêm mục tiêu
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editItem ? 'Sửa mục tiêu' : 'Thêm mục tiêu mới'}</DialogTitle>
                        </DialogHeader>
                        <MucTieuForm editItem={editItem} onSuccess={handleCloseForm} />
                    </DialogContent>
                </Dialog>
            </div>

            {/* Đang thực hiện */}
            <div>
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Đang thực hiện ({dangThucHien.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {dangThucHien.map(mt => (
                        <MucTieuCard
                            key={mt.id}
                            mucTieu={mt}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onNapTien={(item) => setNapTienItem(item)}
                        />
                    ))}
                </div>
            </div>

            {/* Hoàn thành */}
            {hoanThanh.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold mb-3 text-muted-foreground">✅ Đã hoàn thành ({hoanThanh.length})</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                        {hoanThanh.map(mt => (
                            <MucTieuCard
                                key={mt.id}
                                mucTieu={mt}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onNapTien={() => {}}
                            />
                        ))}
                    </div>
                </div>
            )}

            {napTienItem && (
                <NapTienDialog
                    open={!!napTienItem}
                    onOpenChange={(v) => !v && setNapTienItem(null)}
                    mucTieu={napTienItem}
                />
            )}
        </div>
    );
}
