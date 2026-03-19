import apiClient from '@/lib/api';
import { MucTieuTietKiem, CreateMucTieuRequest, NapTienRequest } from '@/types';

export const mucTieuService = {
    getAll: async (): Promise<MucTieuTietKiem[]> => {
        try {
            const response: any = await apiClient.get('/muc-tieu');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch muc tieu:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.get(`/muc-tieu/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch muc tieu ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateMucTieuRequest): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.post('/muc-tieu', data);
            return response.data;
        } catch (error) {
            console.error('Failed to create muc tieu:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateMucTieuRequest>): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.put(`/muc-tieu/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Failed to update muc tieu ${id}:`, error);
            throw error;
        }
    },

    napTien: async (id: number, data: NapTienRequest): Promise<MucTieuTietKiem> => {
        try {
            const response: any = await apiClient.post(`/muc-tieu/${id}/nap-tien`, data);
            return response.data;
        } catch (error) {
            console.error(`Failed to nap tien for muc tieu ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/muc-tieu/${id}`);
        } catch (error) {
            console.error(`Failed to delete muc tieu ${id}:`, error);
            throw error;
        }
    },
};
