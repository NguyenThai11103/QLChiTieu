'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateMucTieu, useUpdateMucTieu } from "@/hooks/useMucTieu";
import { MucTieuTietKiem } from "@/types";

const schema = z.object({
    ten_muc_tieu: z.string().min(1, 'Tên không được để trống'),
    so_tien_muc_tieu: z.coerce.number().min(10000, 'Tối thiểu 10.000đ'),
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
        resolver: zodResolver(schema) as any,
        defaultValues: {
            ten_muc_tieu: editItem?.ten_muc_tieu ?? '',
            so_tien_muc_tieu: editItem?.so_tien_muc_tieu ?? 0,
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
                <FormField control={form.control} name="ten_muc_tieu" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên mục tiêu</FormLabel>
                        <FormControl><Input placeholder="Mua xe máy, du lịch Nhật..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="so_tien_muc_tieu" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số tiền mục tiêu (₫)</FormLabel>
                        <FormControl><Input type="number" placeholder="0" {...field} /></FormControl>
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
