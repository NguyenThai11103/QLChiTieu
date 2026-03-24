'use client';

import { useState } from "react";
import { NhacNhoForm } from "@/components/nhac-nho/NhacNhoForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Trash2, Pencil, Plus } from "lucide-react";
import { NhacNho } from "@/types";
import { useNhacNho, useDeleteNhacNho } from "@/hooks/useNhacNho";

export default function NhacNhoPage() {
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<NhacNho | null>(null);

    const { data: items = [], isLoading } = useNhacNho();
    const deleteNN = useDeleteNhacNho();

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc xoá nhắc nhở này?')) {
            await deleteNN.mutateAsync(id);
        }
    };

    const handleEdit = (nn: NhacNho) => {
        setEditItem(nn);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Nhắc Nhở</h1>
                    <p className="text-muted-foreground text-sm">Danh sách các khoản cần thanh toán định kỳ</p>
                </div>
                <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Thêm nhắc nhở
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editItem ? 'Sửa nhắc nhở' : 'Thêm nhắc nhở mới'}</DialogTitle>
                        </DialogHeader>
                        <NhacNhoForm editItem={editItem} onSuccess={handleClose} />
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
            ) : (
            <div className="space-y-3">
                {items.map(nn => (
                    <div key={nn.id} className="flex items-center gap-4 bg-card rounded-xl border p-4">
                        <div className="h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 bg-primary/10 text-primary">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate">{nn.tieu_de}</p>
                            <p className="text-xs text-muted-foreground mt-1">Số tiền: {Number(nn.so_tien).toLocaleString('vi-VN')} ₫</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(nn)}>
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(nn.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                ))}
                {items.length === 0 && (
                    <div className="text-center py-16 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p>Chưa có nhắc nhở nào.</p>
                    </div>
                )}
            </div>
            )}
        </div>
    );
}
