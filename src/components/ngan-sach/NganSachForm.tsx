'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateNganSach, useUpdateNganSach } from "@/hooks/useNganSach";
import { useDanhMuc } from "@/hooks/useDanhMuc";
import { NganSach } from "@/types";

const schema = z.object({
    danh_muc_id: z.coerce.number().min(1, 'Chọn danh mục'),
    so_tien_gioi_han: z.coerce.number().min(10000, 'Tối thiểu 10.000đ'),
    thang: z.coerce.number().min(1).max(12),
    nam: z.coerce.number().min(2020).max(2099),
});

type FormData = z.infer<typeof schema>;

interface NganSachFormProps {
    editItem?: NganSach | null;
    defaultThang?: number;
    defaultNam?: number;
    onSuccess: () => void;
}

const now = new Date();

export function NganSachForm({ editItem, defaultThang, defaultNam, onSuccess }: NganSachFormProps) {
    const createNS = useCreateNganSach();
    const updateNS = useUpdateNganSach();
    const { data: danhMucList = [] } = useDanhMuc('chi');

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            danh_muc_id: editItem?.danh_muc_id ?? 0,
            so_tien_gioi_han: editItem?.so_tien_gioi_han ?? undefined,
            thang: editItem?.thang ?? (defaultThang ?? now.getMonth() + 1),
            nam: editItem?.nam ?? (defaultNam ?? now.getFullYear()),
        },
    });

    const onSubmit = async (data: FormData) => {
        if (editItem) {
            await updateNS.mutateAsync({ id: editItem.id, data });
        } else {
            await createNS.mutateAsync(data);
        }
        onSuccess();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField control={form.control} name="danh_muc_id" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Danh mục chi tiêu</FormLabel>
                        <Select onValueChange={v => field.onChange(Number(v))} value={field.value ? String(field.value) : ''}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Chọn danh mục" /></SelectTrigger></FormControl>
                            <SelectContent>
                                {danhMucList.map(dm => (
                                    <SelectItem key={dm.id} value={String(dm.id)}>{dm.bieu_tuong} {dm.ten}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="so_tien_gioi_han" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Giới hạn (₫)</FormLabel>
                        <FormControl><Input type="number" placeholder="0" min={10000} step={10000} {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="grid grid-cols-2 gap-3">
                    <FormField control={form.control} name="thang" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tháng</FormLabel>
                            <Select onValueChange={v => field.onChange(Number(v))} value={String(field.value)}>
                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent>
                                    {Array.from({ length: 12 }, (_, i) => (
                                        <SelectItem key={i + 1} value={String(i + 1)}>Tháng {i + 1}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={form.control} name="nam" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Năm</FormLabel>
                            <FormControl><Input type="number" min={2020} max={2099} {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <Button type="submit" className="w-full" disabled={createNS.isPending || updateNS.isPending}>
                    {editItem ? 'Cập nhật' : 'Thêm ngân sách'}
                </Button>
            </form>
        </Form>
    );
}
