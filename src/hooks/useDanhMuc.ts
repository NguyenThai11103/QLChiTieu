import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { danhMucService } from '@/services/danh-muc.service';
import { CreateDanhMucRequest, LoaiDanhMuc } from '@/types';

export function useDanhMuc(loai?: LoaiDanhMuc) {
    return useQuery({
        queryKey: ['danh-muc', loai],
        queryFn: async () => {
            const all = await danhMucService.getAll();
            return loai ? all.filter(dm => dm.loai === loai) : all;
        },
    });
}

export function useCreateDanhMuc() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateDanhMucRequest) => danhMucService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['danh-muc'] });
            toast.success('Đã thêm danh mục!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Thêm danh mục thất bại');
        },
    });
}

export function useUpdateDanhMuc() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateDanhMucRequest> }) =>
            danhMucService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['danh-muc'] });
            toast.success('Đã cập nhật danh mục!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Cập nhật thất bại');
        },
    });
}

export function useDeleteDanhMuc() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => danhMucService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['danh-muc'] });
            toast.success('Đã xoá danh mục!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Xoá thất bại');
        },
    });
}
