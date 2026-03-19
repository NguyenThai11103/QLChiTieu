import apiClient from '@/lib/api';
import { NganSach, CreateNganSachRequest } from '@/types';

export const nganSachService = {
    getAll: async (thang?: number, nam?: number): Promise<NganSach[]> => {
        try {
            const response: any = await apiClient.get('/ngan-sach', {
                params: { thang, nam },
            });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch ngan sach:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<NganSach> => {
        try {
            const response: any = await apiClient.get(`/ngan-sach/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch ngan sach ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateNganSachRequest): Promise<NganSach> => {
        try {
            const response: any = await apiClient.post('/ngan-sach', data);
            return response.data;
        } catch (error) {
            console.error('Failed to create ngan sach:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateNganSachRequest>): Promise<NganSach> => {
        try {
            const response: any = await apiClient.put(`/ngan-sach/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Failed to update ngan sach ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/ngan-sach/${id}`);
        } catch (error) {
            console.error(`Failed to delete ngan sach ${id}:`, error);
            throw error;
        }
    },
};
