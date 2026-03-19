import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { giaoDichService } from '@/services/giao-dich.service';
import { CreateGiaoDichRequest, GetGiaoDichParams } from '@/types';

export function useGiaoDich(params: GetGiaoDichParams = {}) {
    return useQuery({
        queryKey: ['giao-dich', params],
        queryFn: () => giaoDichService.getAll(params),
    });
}

export function useGiaoDichById(id: number) {
    return useQuery({
        queryKey: ['giao-dich', id],
        queryFn: () => giaoDichService.getById(id),
        enabled: !!id,
    });
}

export function useCreateGiaoDich() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateGiaoDichRequest) => giaoDichService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['giao-dich'] });
            queryClient.invalidateQueries({ queryKey: ['thong-ke'] });
            queryClient.invalidateQueries({ queryKey: ['ngan-sach'] });
            toast.success('Đã thêm giao dịch thành công!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Thêm giao dịch thất bại');
        },
    });
}

export function useUpdateGiaoDich() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateGiaoDichRequest> }) =>
            giaoDichService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['giao-dich'] });
            queryClient.invalidateQueries({ queryKey: ['thong-ke'] });
            toast.success('Đã cập nhật giao dịch!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Cập nhật thất bại');
        },
    });
}

export function useDeleteGiaoDich() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => giaoDichService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['giao-dich'] });
            queryClient.invalidateQueries({ queryKey: ['thong-ke'] });
            queryClient.invalidateQueries({ queryKey: ['ngan-sach'] });
            toast.success('Đã xoá giao dịch!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Xoá thất bại');
        },
    });
}
