import apiClient from '@/lib/api';
import { NhacNho, CreateNhacNhoRequest } from '@/types';

export const nhacNhoService = {
    getAll: async (): Promise<NhacNho[]> => {
        try {
            const response: any = await apiClient.get('/nhac-nho');
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch nhac nho:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.get(`/nhac-nho/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch nhac nho ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateNhacNhoRequest): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.post('/nhac-nho', data);
            return response.data;
        } catch (error) {
            console.error('Failed to create nhac nho:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateNhacNhoRequest>): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.put(`/nhac-nho/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Failed to update nhac nho ${id}:`, error);
            throw error;
        }
    },

    toggleTrangThai: async (id: number): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.patch(`/nhac-nho/${id}/trang-thai`);
            return response.data;
        } catch (error) {
            console.error(`Failed to toggle nhac nho ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/nhac-nho/${id}`);
        } catch (error) {
            console.error(`Failed to delete nhac nho ${id}:`, error);
            throw error;
        }
    },
};
