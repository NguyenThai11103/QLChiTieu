'use client';

import { useState } from "react";
// Remove mock data
import { DanhMucForm } from "@/components/danh-muc/DanhMucForm";
import { DanhMucCard } from "@/components/danh-muc/DanhMucCard";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { DanhMuc } from "@/types";
import { useDanhMuc, useDeleteDanhMuc } from "@/hooks/useDanhMuc";

export default function DanhMucPage() {
    const [open, setOpen] = useState(false);
    const [editItem, setEditItem] = useState<DanhMuc | null>(null);
    const { data: items = [], isLoading } = useDanhMuc();
    const deleteDM = useDeleteDanhMuc();

    const chiList = items.filter(dm => dm.loai === 'chi');
    const thuList = items.filter(dm => dm.loai === 'thu');

    const handleEdit = (dm: DanhMuc) => {
        setEditItem(dm);
        setOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Bạn có chắc xoá danh mục này?')) {
            await deleteDM.mutateAsync(id);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setEditItem(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Danh Mục</h1>
                    <p className="text-muted-foreground text-sm">Phân loại giao dịch của bạn</p>
                </div>
                <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Thêm danh mục
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editItem ? 'Sửa danh mục' : 'Thêm danh mục mới'}</DialogTitle>
                        </DialogHeader>
                        <DanhMucForm editItem={editItem} onSuccess={handleClose} />
                    </DialogContent>
                </Dialog>
            </div>

            {isLoading ? (
                <div className="flex justify-center p-12">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                </div>
            ) : (
                <Tabs defaultValue="chi">
                <TabsList>
                    <TabsTrigger value="chi">Chi tiêu ({chiList.length})</TabsTrigger>
                    <TabsTrigger value="thu">Thu nhập ({thuList.length})</TabsTrigger>
                </TabsList>
                <TabsContent value="chi" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {chiList.map(dm => (
                            <DanhMucCard key={dm.id} danhMuc={dm} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="thu" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {thuList.map(dm => (
                            <DanhMucCard key={dm.id} danhMuc={dm} onEdit={handleEdit} onDelete={handleDelete} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
            )}
        </div>
    );
}
