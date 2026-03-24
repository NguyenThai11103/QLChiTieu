import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nhacNhoService } from '@/services/nhac-nho.service';
import { CreateNhacNhoRequest } from '@/types';

export function useNhacNho() {
    return useQuery({
        queryKey: ['nhac-nho'],
        queryFn: () => nhacNhoService.getAll(),
    });
}

export function useCreateNhacNho() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateNhacNhoRequest) => nhacNhoService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nhac-nho'] });
            toast.success('Đã thêm nhắc nhở!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Thêm nhắc nhở thất bại');
        },
    });
}

export function useUpdateNhacNho() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateNhacNhoRequest> }) =>
            nhacNhoService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nhac-nho'] });
            toast.success('Đã cập nhật nhắc nhở!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Cập nhật thất bại');
        },
    });
}

export function useToggleNhacNho() {
    const queryClient = useQueryClient();
    return useMutation({
        // mutationFn: (id: number) => nhacNhoService.toggleTrangThai(id),
        mutationFn: async (id: number) => { console.log('Not implemented in backend'); },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nhac-nho'] });
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Thao tác thất bại');
        },
    });
}

export function useDeleteNhacNho() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => nhacNhoService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nhac-nho'] });
            toast.success('Đã xoá nhắc nhở!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Xoá thất bại');
        },
    });
}
