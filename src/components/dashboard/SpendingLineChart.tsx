'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { BieuDoChiTieu } from "@/types";
import { format, parseISO } from "date-fns";

interface SpendingLineChartProps {
    data: BieuDoChiTieu[];
}

const formatVND = (v: number) => `${(v / 1_000_000).toFixed(1)}M`;

export function SpendingLineChart({ data }: SpendingLineChartProps) {
    const chartData = data.map(d => ({
        date: format(parseISO(d.ngay), 'dd/MM'),
        'Thu': d.tong_thu,
        'Chi': d.tong_chi,
    }));

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Xu hướng thu chi (30 ngày)</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 11 }}
                            tickLine={false}
                            interval="preserveStartEnd"
                        />
                        <YAxis tickFormatter={formatVND} tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                        <Tooltip
                            formatter={(v: number, name: string) => [`${v.toLocaleString('vi-VN')} ₫`, name]}
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="Thu" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="Chi" stroke="hsl(0, 84%, 60%)" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
