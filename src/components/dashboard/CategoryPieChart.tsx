'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ThongKeTheoDanhMuc } from "@/types";

interface CategoryPieChartProps {
    data: ThongKeTheoDanhMuc[];
    loading?: boolean;
}

export function CategoryPieChart({ data, loading }: CategoryPieChartProps) {
    const chartData = data.map(item => ({
        name: `${item.danh_muc.bieu_tuong} ${item.danh_muc.ten}`,
        value: item.tong_tien,
        color: item.danh_muc.mau_sac,
    }));

    if (loading) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Chi tiêu theo danh mục</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[220px]">
                    <div className="h-32 w-32 rounded-full bg-muted animate-pulse" />
                </CardContent>
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">Chi tiêu theo danh mục</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[220px] text-muted-foreground text-sm">
                    Chưa có dữ liệu
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Chi tiêu theo danh mục</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="45%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(v: number) => `${v.toLocaleString('vi-VN')} ₫`} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            formatter={(value) => <span className="text-xs">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
