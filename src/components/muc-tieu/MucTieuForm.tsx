'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateMucTieu, useUpdateMucTieu } from "@/hooks/useMucTieu";
import { MucTieuTietKiem } from "@/types";

const schema = z.object({
    ten: z.string().min(1, 'Tên không được để trống'),
    mo_ta: z.string().optional(),
    so_tien_muc_tieu: z.coerce.number().min(10000, 'Tối thiểu 10.000đ'),
    han_chot: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface MucTieuFormProps {
    editItem?: MucTieuTietKiem | null;
    onSuccess: () => void;
}

export function MucTieuForm({ editItem, onSuccess }: MucTieuFormProps) {
    const createMT = useCreateMucTieu();
    const updateMT = useUpdateMucTieu();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            ten: editItem?.ten ?? '',
            mo_ta: editItem?.mo_ta ?? '',
            so_tien_muc_tieu: editItem?.so_tien_muc_tieu ?? undefined,
            han_chot: editItem?.han_chot ?? '',
        },
    });

    const onSubmit = async (data: FormData) => {
        if (editItem) {
            await updateMT.mutateAsync({ id: editItem.id, data });
        } else {
            await createMT.mutateAsync(data);
        }
        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="ten" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên mục tiêu</FormLabel>
                        <FormControl><Input placeholder="Mua xe máy, du lịch Nhật..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="so_tien_muc_tieu" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số tiền mục tiêu (₫)</FormLabel>
                        <FormControl><Input type="number" placeholder="0" min={10000} step={100000} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="han_chot" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Hạn chót (tùy chọn)</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="mo_ta" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl><Textarea placeholder="Ghi chú về mục tiêu..." rows={2} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={createMT.isPending || updateMT.isPending}>
                    {editItem ? 'Cập nhật' : 'Tạo mục tiêu'}
                </Button>
            </form>
        </Form>
    );
}
