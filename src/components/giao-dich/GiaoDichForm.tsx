'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateGiaoDich, useUpdateGiaoDich } from "@/hooks/useGiaoDich";
import { GiaoDich, DanhMuc, LoaiGiaoDich } from "@/types";
import { format } from "date-fns";

const schema = z.object({
    loai: z.enum(['thu', 'chi']),
    danh_muc_id: z.coerce.number().min(1, 'Chọn danh mục'),
    so_tien: z.coerce.number().min(1000, 'Số tiền tối thiểu 1.000đ'),
    noi_dung: z.string().optional(),
    ngay_giao_dich: z.string().min(1, 'Chọn ngày'),
});

type FormData = z.infer<typeof schema>;

interface GiaoDichFormProps {
    editItem?: GiaoDich | null;
    danhMucList: DanhMuc[];
    onSuccess: () => void;
}

export function GiaoDichForm({ editItem, danhMucList, onSuccess }: GiaoDichFormProps) {
    const createGD = useCreateGiaoDich();
    const updateGD = useUpdateGiaoDich();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            loai: (editItem?.loai as LoaiGiaoDich) ?? 'chi',
            danh_muc_id: editItem?.danh_muc_id ?? 0,
            so_tien: editItem?.so_tien ?? ('' as unknown as number),
            noi_dung: editItem?.noi_dung ?? '',
            ngay_giao_dich: editItem?.ngay_giao_dich ?? format(new Date(), 'yyyy-MM-dd'),
        },
    });

    const loai = form.watch('loai');
    const filteredDM = danhMucList.filter(dm => dm.loai === loai);

    const onSubmit = async (data: FormData) => {
        if (editItem) {
            await updateGD.mutateAsync({ id: editItem.id, data });
        } else {
            await createGD.mutateAsync(data);
        }
        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Loại */}
                <FormField control={form.control} name="loai" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Loại giao dịch</FormLabel>
                        <div className="flex gap-2">
                            {(['thu', 'chi'] as LoaiGiaoDich[]).map(l => (
                                <Button
                                    key={l}
                                    type="button"
                                    variant={field.value === l ? 'default' : 'outline'}
                                    className="flex-1"
                                    onClick={() => { field.onChange(l); form.setValue('danh_muc_id', 0); }}
                                >
                                    {l === 'thu' ? '📈 Thu nhập' : '📉 Chi tiêu'}
                                </Button>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Danh mục */}
                <FormField control={form.control} name="danh_muc_id" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Danh mục</FormLabel>
                        <Select onValueChange={v => field.onChange(Number(v))} value={field.value ? String(field.value) : ''}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {filteredDM.map(dm => (
                                    <SelectItem key={dm.id} value={String(dm.id)}>
                                        {dm.bieu_tuong} {dm.ten}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Số tiền */}
                <FormField control={form.control} name="so_tien" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số tiền (₫)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="0" min={1000} step={1000} {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Ngày */}
                <FormField control={form.control} name="ngay_giao_dich" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ngày</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                {/* Nội dung */}
                <FormField control={form.control} name="noi_dung" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl><Textarea placeholder="Mô tả giao dịch..." rows={2} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={createGD.isPending || updateGD.isPending}>
                    {editItem ? 'Cập nhật' : 'Thêm giao dịch'}
                </Button>
            </form>
        </Form>
    );
}
