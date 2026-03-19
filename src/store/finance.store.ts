import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LoaiGiaoDich } from '@/types';

interface FinanceState {
    selectedMonth: number;
    selectedYear: number;
    activeCategoryFilter: number | null;
    activeTypeFilter: LoaiGiaoDich | null;
    viewMode: 'list' | 'chart';
    setMonth: (month: number) => void;
    setYear: (year: number) => void;
    setMonthYear: (month: number, year: number) => void;
    setCategoryFilter: (id: number | null) => void;
    setTypeFilter: (loai: LoaiGiaoDich | null) => void;
    setViewMode: (mode: 'list' | 'chart') => void;
    resetFilters: () => void;
}

const now = new Date();

export const useFinanceStore = create<FinanceState>()(
    persist(
        (set) => ({
            selectedMonth: now.getMonth() + 1,
            selectedYear: now.getFullYear(),
            activeCategoryFilter: null,
            activeTypeFilter: null,
            viewMode: 'list',

            setMonth: (month) => set({ selectedMonth: month }),
            setYear: (year) => set({ selectedYear: year }),
            setMonthYear: (month, year) => set({ selectedMonth: month, selectedYear: year }),

            setCategoryFilter: (id) => set({ activeCategoryFilter: id }),
            setTypeFilter: (loai) => set({ activeTypeFilter: loai }),
            setViewMode: (mode) => set({ viewMode: mode }),

            resetFilters: () => set({
                activeCategoryFilter: null,
                activeTypeFilter: null,
            }),
        }),
        {
            name: 'finance-storage',
        }
    )
);
