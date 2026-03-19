import apiClient from '@/lib/api';
import {
    TongQuanTaiChinh,
    ThongKeTheoDanhMuc,
    BieuDoChiTieu,
    SoSanhThang,
} from '@/types';

export const thongKeService = {
    getTongQuan: async (thang: number, nam: number): Promise<TongQuanTaiChinh> => {
        try {
            const response: any = await apiClient.get('/thong-ke/tong-quan', {
                params: { thang, nam },
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch tong quan:', error);
            throw error;
        }
    },

    getTheoDanhMuc: async (thang: number, nam: number): Promise<ThongKeTheoDanhMuc[]> => {
        try {
            const response: any = await apiClient.get('/thong-ke/theo-danh-muc', {
                params: { thang, nam },
            });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch thong ke theo danh muc:', error);
            return [];
        }
    },

    getBieuDoChiTieu: async (tu_ngay: string, den_ngay: string): Promise<BieuDoChiTieu[]> => {
        try {
            const response: any = await apiClient.get('/thong-ke/bieu-do-chi-tieu', {
                params: { tu_ngay, den_ngay },
            });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch bieu do chi tieu:', error);
            return [];
        }
    },

    getSoSanhThang: async (nam: number): Promise<SoSanhThang[]> => {
        try {
            const response: any = await apiClient.get('/thong-ke/so-sanh-thang', {
                params: { nam },
            });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch so sanh thang:', error);
            return [];
        }
    },
};
