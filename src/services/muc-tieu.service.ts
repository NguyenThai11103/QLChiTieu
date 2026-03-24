import apiClient from '@/lib/api';
import { MucTieuTietKiem, CreateMucTieuRequest } from '@/types';

export const mucTieuService = {
    getAll: async (params: any = {}): Promise<MucTieuTietKiem[]> => {
        try {
            const response: any = await apiClient.get('/muc-tieu/data', { params });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch muc tieu:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.get(`/muc-tieu/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Failed to fetch muc tieu ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateMucTieuRequest): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.post('/muc-tieu/create', data);
            return response.data || response;
        } catch (error) {
            console.error('Failed to create muc tieu:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateMucTieuRequest>): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.post(`/muc-tieu/update`, { id, ...data });
            return response.data || response;
        } catch (error) {
            console.error(`Failed to update muc tieu ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.post(`/muc-tieu/delete`, { id });
        } catch (error) {
            console.error(`Failed to delete muc tieu ${id}:`, error);
            throw error;
        }
    },

    napTien: async (id: number, data: any): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.post(`/muc-tieu/nap-tien`, { id, ...data });
            return response.data || response;
        } catch (error) {
            console.error(`Failed to nap tien ${id}:`, error);
            throw error;
        }
    },
};
