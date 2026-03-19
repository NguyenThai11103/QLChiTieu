'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateNhacNho, useUpdateNhacNho } from "@/hooks/useNhacNho";
import { NhacNho, LapLaiNhacNho } from "@/types";
import { format } from "date-fns";

const schema = z.object({
    tieu_de: z.string().min(1, 'Tiêu đề không được để trống'),
    noi_dung: z.string().optional(),
    ngay_nhac: z.string().min(1, 'Chọn ngày'),
    gio_nhac: z.string().optional(),
    lap_lai: z.enum(['mot_lan', 'hang_ngay', 'hang_tuan', 'hang_thang']),
});

type FormData = z.infer<typeof schema>;

interface NhacNhoFormProps {
    editItem?: NhacNho | null;
    onSuccess: () => void;
}

const lapLaiOptions: { value: LapLaiNhacNho; label: string }[] = [
    { value: 'mot_lan', label: 'Một lần' },
    { value: 'hang_ngay', label: 'Hàng ngày' },
    { value: 'hang_tuan', label: 'Hàng tuần' },
    { value: 'hang_thang', label: 'Hàng tháng' },
];

export function NhacNhoForm({ editItem, onSuccess }: NhacNhoFormProps) {
    const createNN = useCreateNhacNho();
    const updateNN = useUpdateNhacNho();

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            tieu_de: editItem?.tieu_de ?? '',
            noi_dung: editItem?.noi_dung ?? '',
            ngay_nhac: editItem?.ngay_nhac ?? format(new Date(), 'yyyy-MM-dd'),
            gio_nhac: editItem?.gio_nhac ?? '',
            lap_lai: (editItem?.lap_lai as LapLaiNhacNho) ?? 'mot_lan',
        },
    });

    const onSubmit = async (data: FormData) => {
        if (editItem) {
            await updateNN.mutateAsync({ id: editItem.id, data });
        } else {
            await createNN.mutateAsync(data);
        }
        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="tieu_de" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormControl><Input placeholder="Trả tiền điện, tiền thuê nhà..." {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="ngay_nhac" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày nhắc</FormLabel>
                            <FormControl><Input type="date" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="gio_nhac" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giờ nhắc</FormLabel>
                            <FormControl><Input type="time" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <FormField control={form.control} name="lap_lai" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Lặp lại</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                                {lapLaiOptions.map(opt => (
                                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="noi_dung" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ghi chú</FormLabel>
                        <FormControl><Textarea placeholder="Thêm mô tả..." rows={2} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <Button type="submit" className="w-full" disabled={createNN.isPending || updateNN.isPending}>
                    {editItem ? 'Cập nhật' : 'Thêm nhắc nhở'}
                </Button>
            </form>
        </Form>
    );
}
