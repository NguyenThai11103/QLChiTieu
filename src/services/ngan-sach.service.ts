import apiClient from '@/lib/api';
import { NganSach, CreateNganSachRequest } from '@/types';

export const nganSachService = {
    getAll: async (thang?: number, nam?: number): Promise<NganSach[]> => {
        try {
            const response: any = await apiClient.get('/ngan-sach/data', { params: { thang, nam } });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch ngan sach:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<NganSach> => {
        try {
            const response: any = await apiClient.get(`/ngan-sach/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Failed to fetch ngan sach ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateNganSachRequest): Promise<NganSach> => {
        try {
            const response: any = await apiClient.post('/ngan-sach/create', data);
            return response.data || response;
        } catch (error) {
            console.error('Failed to create ngan sach:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateNganSachRequest>): Promise<NganSach> => {
        try {
            const response: any = await apiClient.post(`/ngan-sach/update`, { id, ...data });
            return response.data || response;
        } catch (error) {
            console.error(`Failed to update ngan sach ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.post(`/ngan-sach/delete`, { id });
        } catch (error) {
            console.error(`Failed to delete ngan sach ${id}:`, error);
            throw error;
        }
    },
};
