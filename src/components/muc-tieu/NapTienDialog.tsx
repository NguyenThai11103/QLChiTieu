'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useNapTien } from "@/hooks/useMucTieu";
import { MucTieuTietKiem } from "@/types";
import { Progress } from "@/components/ui/progress";

const schema = z.object({
    so_tien: z.coerce.number().min(1000, 'Tối thiểu 1.000đ'),
    ghi_chu: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface NapTienDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mucTieu: MucTieuTietKiem;
}

export function NapTienDialog({ open, onOpenChange, mucTieu }: NapTienDialogProps) {
    const napTien = useNapTien();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { so_tien: undefined, ghi_chu: '' },
    });

    const onSubmit = async (data: FormData) => {
        await napTien.mutateAsync({ id: mucTieu.id, data });
        onOpenChange(false);
        form.reset();
    };

    const percent = Math.min(mucTieu.phan_tram_hoan_thanh, 100);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Nạp tiền — {mucTieu.ten}</DialogTitle>
                </DialogHeader>

                <div className="space-y-2 bg-muted/50 rounded-lg p-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Hiện có:</span>
                        <span className="font-semibold">{mucTieu.so_tien_hien_tai.toLocaleString('vi-VN')} ₫</span>
                    </div>
                    <Progress value={percent} className="h-2" />
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mục tiêu:</span>
                        <span className="font-semibold">{mucTieu.so_tien_muc_tieu.toLocaleString('vi-VN')} ₫</span>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="so_tien" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số tiền nạp (₫)</FormLabel>
                                <FormControl><Input type="number" placeholder="0" min={1000} step={10000} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <FormField control={form.control} name="ghi_chu" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ghi chú</FormLabel>
                                <FormControl><Textarea placeholder="Tháng lương, tiết kiệm..." rows={2} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />

                        <Button type="submit" className="w-full" disabled={napTien.isPending}>
                            Nạp tiền
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
