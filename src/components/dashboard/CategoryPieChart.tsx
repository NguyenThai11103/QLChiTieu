'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { ThongKeTheoDanhMuc } from "@/types";

interface CategoryPieChartProps {
    data: ThongKeTheoDanhMuc[];
    loading?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0];
    return (
        <div className="rounded-xl p-3 text-xs"
            style={{ background: 'rgba(18,22,42,0.95)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
        >
            <p className="font-bold mb-1" style={{ color: d.payload.color }}>{d.name}</p>
            <p style={{ color: 'var(--muted-foreground)' }}>{Number(d.value).toLocaleString('vi-VN')} ₫</p>
        </div>
    );
};

export function CategoryPieChart({ data, loading }: CategoryPieChartProps) {
    const chartData = data.map((item, index) => {
        // Fallback colors for categories since dbml doesn't have mau_sac
        const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        return {
            name: `🏷️ ${item.danh_muc.ten_danh_muc}`,
            value: item.tong_tien,
            color: colors[index % colors.length],
            percent: item.ty_le_phan_tram,
        };
    });

    return (
        <div className="rounded-2xl p-5 h-full" style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            <div className="mb-4">
                <h3 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Danh mục chi tiêu</h3>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Phân bổ trong tháng</p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <div className="h-28 w-28 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
                </div>
            ) : data.length === 0 ? (
                <div className="flex items-center justify-center h-40 text-xs" style={{ color: 'var(--muted-foreground)' }}>Chưa có dữ liệu</div>
            ) : (
                <>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                                {chartData.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Legend */}
                    <div className="space-y-2 mt-3">
                        {chartData.slice(0, 4).map((item, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                                <span className="text-xs flex-1 truncate" style={{ color: 'var(--muted-foreground)' }}>{item.name}</span>
                                <span className="text-xs font-semibold" style={{ color: 'var(--foreground)' }}>{item.percent.toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
