import apiClient from '@/lib/api';
import {
    GiaoDich,
    CreateGiaoDichRequest,
    GetGiaoDichParams,
    PaginatedResponse,
} from '@/types';

export const giaoDichService = {
    getAll: async (params: GetGiaoDichParams = {}): Promise<PaginatedResponse<GiaoDich>> => {
        try {
            const response: any = await apiClient.get('/giao-dich', { params });
            return response as PaginatedResponse<GiaoDich>;
        } catch (error) {
            console.error('Failed to fetch giao dich:', error);
            throw error;
        }
    },

    getById: async (id: number): Promise<GiaoDich> => {
        try {
            const response: any = await apiClient.get(`/giao-dich/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch giao dich ${id}:`, error);
            throw error;
        }
    },

    create: async (data: CreateGiaoDichRequest): Promise<GiaoDich> => {
        try {
            const response: any = await apiClient.post('/giao-dich', data);
            return response.data;
        } catch (error) {
            console.error('Failed to create giao dich:', error);
            throw error;
        }
    },

    update: async (id: number, data: Partial<CreateGiaoDichRequest>): Promise<GiaoDich> => {
        try {
            const response: any = await apiClient.put(`/giao-dich/${id}`, data);
            return response.data;
        } catch (error) {
            console.error(`Failed to update giao dich ${id}:`, error);
            throw error;
        }
    },

    remove: async (id: number): Promise<void> => {
        try {
            await apiClient.delete(`/giao-dich/${id}`);
        } catch (error) {
            console.error(`Failed to delete giao dich ${id}:`, error);
            throw error;
        }
    },
};
