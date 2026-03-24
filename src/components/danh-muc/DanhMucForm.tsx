'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateDanhMuc, useUpdateDanhMuc } from "@/hooks/useDanhMuc";
import { DanhMuc, LoaiDanhMuc } from "@/types";

const schema = z.object({
    ten_danh_muc: z.string().min(1, 'Tên danh mục không được để trống'),
    loai: z.enum(['thu', 'chi']),
});

type FormData = z.infer<typeof schema>;

interface DanhMucFormProps {
    editItem?: DanhMuc | null;
    onSuccess: () => void;
}

export function DanhMucForm({ editItem, onSuccess }: DanhMucFormProps) {
    const createDM = useCreateDanhMuc();
    const updateDM = useUpdateDanhMuc();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            ten_danh_muc: editItem?.ten_danh_muc ?? '',
            loai: (editItem?.loai as LoaiDanhMuc) ?? 'chi',
        },
    });

    const onSubmit = async (data: FormData) => {
        if (editItem) {
            await updateDM.mutateAsync({ id: editItem.id, data });
        } else {
            await createDM.mutateAsync(data);
        }
        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="loai" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Loại</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="chi">Chi tiêu</SelectItem>
                                <SelectItem value="thu">Thu nhập</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="ten_danh_muc" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên danh mục</FormLabel>
                        <FormControl><Input placeholder="Ví dụ: Ăn uống" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={createDM.isPending || updateDM.isPending}>
                    {editItem ? 'Cập nhật' : 'Thêm danh mục'}
                </Button>
            </form>
        </Form>
    );
}
