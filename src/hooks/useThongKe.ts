import { useQuery } from '@tanstack/react-query';
import { thongKeService } from '@/services/thong-ke.service';

export function useThongKeTongQuan(thang: number, nam: number) {
    return useQuery({
        queryKey: ['thong-ke', 'tong-quan', thang, nam],
        queryFn: () => thongKeService.getTongQuan(thang, nam),
        enabled: !!thang && !!nam,
    });
}

export function useThongKeTheoDanhMuc(thang: number, nam: number) {
    return useQuery({
        queryKey: ['thong-ke', 'theo-danh-muc', thang, nam],
        queryFn: () => thongKeService.getTheoDanhMuc(thang, nam),
        enabled: !!thang && !!nam,
    });
}

export function useBieuDoChiTieu(tu_ngay: string, den_ngay: string) {
    return useQuery({
        queryKey: ['thong-ke', 'bieu-do', tu_ngay, den_ngay],
        queryFn: () => thongKeService.getBieuDoChiTieu(tu_ngay, den_ngay),
        enabled: !!tu_ngay && !!den_ngay,
    });
}

export function useSoSanhThang(nam: number) {
    return useQuery({
        queryKey: ['thong-ke', 'so-sanh-thang', nam],
        queryFn: () => thongKeService.getSoSanhThang(nam),
        enabled: !!nam,
    });
}
