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

const PRESET_EMOJIS = ['🍔', '🛒', '🏠', '🚌', '💊', '📚', '🎮', '✈️', '🎁', '💰', '📈', '🏋️', '☕', '🎬', '💡'];
const PRESET_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899', '#f97316', '#84cc16', '#64748b'];

const schema = z.object({
    ten: z.string().min(1, 'Tên danh mục không được để trống'),
    bieu_tuong: z.string().min(1, 'Chọn biểu tượng'),
    mau_sac: z.string().min(1, 'Chọn màu sắc'),
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
            ten: editItem?.ten ?? '',
            bieu_tuong: editItem?.bieu_tuong ?? '💰',
            mau_sac: editItem?.mau_sac ?? '#3b82f6',
            loai: (editItem?.loai as LoaiDanhMuc) ?? 'chi',
        },
    });

    const selectedEmoji = form.watch('bieu_tuong');
    const selectedColor = form.watch('mau_sac');

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

                <FormField control={form.control} name="ten" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tên danh mục</FormLabel>
                        <FormControl><Input placeholder="Ví dụ: Ăn uống" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="bieu_tuong" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Biểu tượng</FormLabel>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_EMOJIS.map(emoji => (
                                <button
                                    key={emoji}
                                    type="button"
                                    onClick={() => field.onChange(emoji)}
                                    className={`h-9 w-9 rounded-lg text-lg flex items-center justify-center border-2 transition-all ${selectedEmoji === emoji ? 'border-primary bg-primary/10 scale-110' : 'border-border hover:border-muted-foreground'}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )} />

                <FormField control={form.control} name="mau_sac" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Màu sắc</FormLabel>
                        <div className="flex flex-wrap gap-2">
                            {PRESET_COLORS.map(color => (
                                <button
                                    key={color}
                                    type="button"
                                    onClick={() => field.onChange(color)}
                                    className={`h-7 w-7 rounded-full border-2 transition-all ${selectedColor === color ? 'border-foreground scale-125' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
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
