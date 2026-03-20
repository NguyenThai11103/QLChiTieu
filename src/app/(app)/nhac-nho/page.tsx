'use client';

import { useState } from "react";
// Remove mock data
import { NhacNhoForm } from "@/components/nhac-nho/NhacNhoForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Trash2, Pencil } from "lucide-react";
import { NhacNho, LapLaiNhacNho } from "@/types";
import { useNhacNho, useDeleteNhacNho, useToggleNhacNho } from "@/hooks/useNhacNho";
import { format } from "date-fns";

const lapLaiLabel: Record<LapLaiNhacNho, string> = {
    mot_lan: 'Một lần',
    hang_ngay: 'Hàng ngày',
    hang_tuan: 'Hàng tuần',
    hang_thang: 'Hàng tháng',
};

export default function NhacNhoPage() {
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<NhacNho | null>(null);

    const { data: items = [], isLoading } = useNhacNho();
    const deleteNN = useDeleteNhacNho();
    const toggleNN = useToggleNhacNho();

    const handleToggle = async (nn: NhacNho) => {
        await toggleNN.mutateAsync(nn.id);
    };

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

    const batList = items.filter(nn => nn.trang_thai);
    const tatList = items.filter(nn => !nn.trang_thai);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Nhắc Nhở</h1>
                    <p className="text-muted-foreground text-sm">Đừng quên các khoản chi định kỳ</p>
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
                {[...batList, ...tatList].map(nn => (
                    <div key={nn.id} className="flex items-center gap-4 bg-card rounded-xl border p-4">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${nn.trang_thai ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                            <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-foreground truncate">{nn.tieu_de}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs text-muted-foreground">
                                    {format(new Date(nn.ngay_nhac), 'dd/MM/yyyy')}
                                    {nn.gio_nhac ? ` - ${nn.gio_nhac}` : ''}
                                </span>
                                <Badge variant="secondary" className="text-xs">{lapLaiLabel[nn.lap_lai]}</Badge>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <Switch checked={nn.trang_thai} onCheckedChange={() => handleToggle(nn)} />
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
