'use client';

import { useState } from "react";
import {
    MOCK_TONG_QUAN,
    MOCK_THEO_DANH_MUC,
    MOCK_BIEU_DO,
    MOCK_GIAO_DICH,
} from "@/lib/mock-data";
import { useFinanceStore } from "@/store/finance.store";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { SpendingLineChart } from "@/components/dashboard/SpendingLineChart";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { MonthYearPicker } from "@/components/common/MonthYearPicker";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

export default function DashboardPage() {
    const { selectedMonth, selectedYear } = useFinanceStore();
    const tongQuan = MOCK_TONG_QUAN;
    const theoDanhMuc = MOCK_THEO_DANH_MUC;
    const bieuDo = MOCK_BIEU_DO;
    const recentTransactions = MOCK_GIAO_DICH.slice(0, 5);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Tổng Quan</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Tháng {selectedMonth}/{selectedYear}
                    </p>
                </div>
                <MonthYearPicker />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard
                    title="Tổng Thu"
                    value={tongQuan.tong_thu}
                    growth={0}
                    icon={<TrendingUp className="h-5 w-5" />}
                    variant="income"
                />
                <SummaryCard
                    title="Tổng Chi"
                    value={tongQuan.tong_chi}
                    growth={0}
                    icon={<TrendingDown className="h-5 w-5" />}
                    variant="expense"
                />
                <SummaryCard
                    title="Số Dư"
                    value={tongQuan.so_du}
                    icon={<Wallet className="h-5 w-5" />}
                    variant="balance"
                />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <SpendingLineChart data={bieuDo} />
                </div>
                <div>
                    <CategoryPieChart data={theoDanhMuc} />
                </div>
            </div>

            {/* Recent Transactions */}
            <RecentTransactions transactions={recentTransactions} />
        </div>
    );
}
