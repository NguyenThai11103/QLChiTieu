'use client';

import {
    MOCK_TONG_QUAN,
    MOCK_THEO_DANH_MUC,
    MOCK_BIEU_DO,
    MOCK_SO_SANH_THANG,
} from "@/lib/mock-data";
import { useFinanceStore } from "@/store/finance.store";
import { MonthYearPicker } from "@/components/common/MonthYearPicker";
import { CategoryPieChart } from "@/components/dashboard/CategoryPieChart";
import { SpendingLineChart } from "@/components/dashboard/SpendingLineChart";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";

const monthLabels = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];

export default function BaoCaoPage() {
    const { selectedMonth, selectedYear } = useFinanceStore();
    const tongQuan = MOCK_TONG_QUAN;
    const theoDanhMuc = MOCK_THEO_DANH_MUC;
    const bieuDo = MOCK_BIEU_DO;

    const chartData = MOCK_SO_SANH_THANG.map(d => ({
        name: monthLabels[d.thang - 1],
        'Thu': d.tong_thu,
        'Chi': d.tong_chi,
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Báo Cáo</h1>
                    <p className="text-muted-foreground text-sm">Phân tích hành vi tài chính của bạn</p>
                </div>
                <MonthYearPicker />
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <SummaryCard title="Tổng Thu" value={tongQuan.tong_thu} growth={tongQuan.tang_truong_thu} icon={<TrendingUp className="h-5 w-5" />} variant="income" />
                <SummaryCard title="Tổng Chi" value={tongQuan.tong_chi} growth={tongQuan.tang_truong_chi} icon={<TrendingDown className="h-5 w-5" />} variant="expense" />
                <SummaryCard title="Số Dư"    value={tongQuan.so_du}                                       icon={<Wallet className="h-5 w-5" />}        variant="balance" />
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SpendingLineChart data={bieuDo} />
                <CategoryPieChart data={theoDanhMuc} />
            </div>

            {/* Monthly bar chart */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">So sánh Thu - Chi theo tháng ({selectedYear})</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(v: number) => `${v.toLocaleString('vi-VN')} ₫`} />
                            <Legend />
                            <Bar dataKey="Thu" fill="hsl(142, 71%, 45%)" radius={[4,4,0,0]} />
                            <Bar dataKey="Chi" fill="hsl(0, 84%, 60%)"   radius={[4,4,0,0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Top categories */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Top danh mục chi tiêu tháng {selectedMonth}/{selectedYear}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {theoDanhMuc.map(item => (
                            <div key={item.danh_muc.id} className="flex items-center gap-3">
                                <span className="text-xl w-7 text-center">{item.danh_muc.bieu_tuong}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-medium truncate">{item.danh_muc.ten}</span>
                                        <span className="text-sm font-semibold ml-2">{item.tong_tien.toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{ width: `${item.ty_le_phan_tram}%`, backgroundColor: item.danh_muc.mau_sac }}
                                        />
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground w-10 text-right">{item.ty_le_phan_tram.toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
