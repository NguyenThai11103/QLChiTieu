'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useCreateNhacNho, useUpdateNhacNho } from "@/hooks/useNhacNho";
import { NhacNho } from "@/types";

const schema = z.object({
    tieu_de: z.string().min(1, 'Tiêu đề không được để trống'),
    so_tien: z.coerce.number().min(1000, 'Số tiền tối thiểu 1.000đ'),
});

type FormData = z.infer<typeof schema>;

interface NhacNhoFormProps {
    editItem?: NhacNho | null;
    onSuccess: () => void;
}

export function NhacNhoForm({ editItem, onSuccess }: NhacNhoFormProps) {
    const createNN = useCreateNhacNho();
    const updateNN = useUpdateNhacNho();

    const form = useForm<FormData>({
        resolver: zodResolver(schema) as any,
        defaultValues: {
            tieu_de: editItem?.tieu_de ?? '',
            so_tien: editItem?.so_tien ?? 0,
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

                <FormField control={form.control} name="so_tien" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Số tiền</FormLabel>
                        <FormControl><Input type="number" placeholder="0" min={1000} step={1000} {...field} /></FormControl>
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
