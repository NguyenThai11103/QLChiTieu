import apiClient from '@/lib/api';
import { DanhMuc, CreateDanhMucRequest } from '@/types';

export const danhMucService = {
    getAll: async (): Promise<DanhMuc[]> => {
        try {
            const response: any = await apiClient.get('/danh-muc');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch danh muc:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<DanhMuc> => {
        try {
            const response: any = await apiClient.get(`/danh-muc/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch danh muc ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateDanhMucRequest): Promise<DanhMuc> => {
        try {
            const response: any = await apiClient.post('/danh-muc', data);
            return response.data;
        } catch (error) {
            console.error('Failed to create danh muc:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateDanhMucRequest>): Promise<DanhMuc> => {
        try {
            const response: any = await apiClient.put(`/danh-muc/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Failed to update danh muc ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/danh-muc/${id}`);
        } catch (error) {
            console.error(`Failed to delete danh muc ${id}:`, error);
            throw error;
        }
    },
};
