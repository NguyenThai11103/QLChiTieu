import apiClient from '@/lib/api';
import {
    GiaoDich,
    CreateGiaoDichRequest,
    GetGiaoDichParams,
    PaginatedResponse,
} from '@/types';

export const giaoDichService = {
    getAll: async (params: GetGiaoDichParams = {}): Promise<GiaoDich[]> => {
        try {
            const response: any = await apiClient.get('/giao-dich/data', { params });
            return response.data || [];
        } catch (error) {
            console.error('Failed to fetch giao dich:', error);
            throw error;
        }
    },

    getById: async (id: number): Promise<GiaoDich> => {
        try {
            const response: any = await apiClient.get(`/giao-dich/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Failed to fetch giao dich ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateGiaoDichRequest): Promise<GiaoDich> => {
        try {
            const response: any = await apiClient.post('/giao-dich/create', data);
            return response.data || response;
        } catch (error) {
            console.error('Failed to create giao dich:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateGiaoDichRequest>): Promise<GiaoDich> => {
        try {
            const response: any = await apiClient.post(`/giao-dich/update`, { id, ...data });
            return response.data || response;
        } catch (error) {
            console.error(`Failed to update giao dich ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.post(`/giao-dich/delete`, { id });
        } catch (error) {
            console.error(`Failed to delete giao dich ${id}:`, error);
            throw error;
        }
    },
};
