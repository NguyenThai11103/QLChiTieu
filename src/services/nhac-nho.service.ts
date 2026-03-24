import apiClient from '@/lib/api';
import { NhacNho, CreateNhacNhoRequest } from '@/types';

export const nhacNhoService = {
    getAll: async (params: any = {}): Promise<NhacNho[]> => {
        try {
            const response: any = await apiClient.get('/nhac-nho/data', { params });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch nhac nho:', error);
            return [];
        }
    },

    getById: async (id: number): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.get(`/nhac-nho/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Failed to fetch nhac nho ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateNhacNhoRequest): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.post('/nhac-nho/create', data);
            return response.data || response;
        } catch (error) {
            console.error('Failed to create nhac nho:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateNhacNhoRequest>): Promise<NhacNho> => {
        try {
            const response: any = await apiClient.post(`/nhac-nho/update`, { id, ...data });
            return response.data || response;
        } catch (error) {
            console.error(`Failed to update nhac nho ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.post(`/nhac-nho/delete`, { id });
        } catch (error) {
            console.error(`Failed to delete nhac nho ${id}:`, error);
            throw error;
        }
    },
};
