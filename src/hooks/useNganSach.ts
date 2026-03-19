import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { nganSachService } from '@/services/ngan-sach.service';
import { CreateNganSachRequest } from '@/types';

export function useNganSach(thang?: number, nam?: number) {
    return useQuery({
        queryKey: ['ngan-sach', thang, nam],
        queryFn: () => nganSachService.getAll(thang, nam),
    });
}

export function useCreateNganSach() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CreateNganSachRequest) => nganSachService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ngan-sach'] });
            toast.success('Đã thêm ngân sách!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Thêm ngân sách thất bại');
        },
    });
}

export function useUpdateNganSach() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<CreateNganSachRequest> }) =>
            nganSachService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ngan-sach'] });
            toast.success('Đã cập nhật ngân sách!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Cập nhật thất bại');
        },
    });
}

export function useDeleteNganSach() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => nganSachService.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['ngan-sach'] });
            toast.success('Đã xoá ngân sách!');
        },
        onError: (error: any) => {
            toast.error(error?.message || 'Xoá thất bại');
        },
    });
}
