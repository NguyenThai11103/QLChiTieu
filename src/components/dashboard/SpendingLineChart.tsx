'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BieuDoChiTieu } from "@/types";
import { format, parseISO } from "date-fns";

interface SpendingLineChartProps {
    data: BieuDoChiTieu[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="rounded-xl p-3 text-xs space-y-1.5"
            style={{ background: 'rgba(18,22,42,0.95)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
        >
            <p className="font-semibold mb-2" style={{ color: 'var(--muted-foreground)' }}>{label}</p>
            {payload.map((entry: any) => (
                <div key={entry.name} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: entry.color }} />
                    <span style={{ color: 'var(--muted-foreground)' }}>{entry.name}:</span>
                    <span className="font-bold" style={{ color: entry.color }}>{entry.value.toLocaleString('vi-VN')} ₫</span>
                </div>
            ))}
        </div>
    );
};

export function SpendingLineChart({ data }: SpendingLineChartProps) {
    const chartData = data.map(d => ({
        date: format(parseISO(d.ngay), 'dd/MM'),
        'Thu': d.tong_thu,
        'Chi': d.tong_chi,
    }));

    return (
        <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Xu hướng thu chi</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>7 ngày gần nhất</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-4 rounded-full bg-emerald-400" />
                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Thu</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="h-2 w-4 rounded-full bg-red-400" />
                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Chi</span>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
                    <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.4)' }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="Thu" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#10b981', strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="Chi" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#ef4444', strokeWidth: 0 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
