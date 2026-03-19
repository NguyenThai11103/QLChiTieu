import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { mucTieuService } from '@/services/muc-tieu.service';
import { CreateMucTieuRequest, NapTienRequest, TrangThaiMucTieu } from '@/types';

export function useMucTieu(trangThai?: TrangThaiMucTieu) {
    return useQuery({
        queryKey: ['muc-tieu', trangThai],
        queryFn: async () => {
            const all = await mucTieuService.getAll();
            return trangThai ? all.filter(mt => mt.trang_thai === trangThai) : all;
        },
    });
}

export function useCreateMucTieu() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateMucTieuRequest) => mucTieuService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['muc-tieu'] });
            toast.success('Đã thêm mục tiêu tiết kiệm!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Thêm mục tiêu thất bại');
        },
    });
}

export function useUpdateMucTieu() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateMucTieuRequest> }) =>
            mucTieuService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['muc-tieu'] });
            toast.success('Đã cập nhật mục tiêu!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Cập nhật thất bại');
        },
    });
}

export function useNapTien() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: NapTienRequest }) =>
            mucTieuService.napTien(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['muc-tieu'] });
            toast.success('Nạp tiền thành công!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Nạp tiền thất bại');
        },
    });
}

export function useDeleteMucTieu() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => mucTieuService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['muc-tieu'] });
            toast.success('Đã xoá mục tiêu!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Xoá thất bại');
        },
    });
}
