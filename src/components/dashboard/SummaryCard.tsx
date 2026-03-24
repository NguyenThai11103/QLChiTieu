'use client';

interface SummaryCardProps {
    title: string;
    value: number;
    growth?: number;
    icon: React.ReactNode;
    variant: 'income' | 'expense' | 'balance';
    loading?: boolean;
}

const variantConfig = {
    income: {
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))',
        border: 'rgba(16,185,129,0.2)',
        iconBg: 'linear-gradient(135deg, #10b981, #059669)',
        iconShadow: '0 4px 14px rgba(16,185,129,0.4)',
        value: '#10b981',
        tag: '#10b981',
        tagBg: 'rgba(16,185,129,0.12)',
        label: 'THU NHẬP',
    },
    expense: {
        gradient: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04))',
        border: 'rgba(239,68,68,0.18)',
        iconBg: 'linear-gradient(135deg, #ef4444, #dc2626)',
        iconShadow: '0 4px 14px rgba(239,68,68,0.35)',
        value: '#ef4444',
        tag: '#ef4444',
        tagBg: 'rgba(239,68,68,0.1)',
        label: 'CHI TIÊU',
    },
    balance: {
        gradient: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))',
        border: 'rgba(245,158,11,0.2)',
        iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
        iconShadow: '0 4px 14px rgba(245,158,11,0.35)',
        value: '#f59e0b',
        tag: '#f59e0b',
        tagBg: 'rgba(245,158,11,0.1)',
        label: 'SỐ DƯ',
    },
};

export function SummaryCard({ title, value, growth, icon, variant, loading }: SummaryCardProps) {
    const cfg = variantConfig[variant];

    if (loading) {
        return (
            <div className="rounded-2xl p-5 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="h-3 w-20 rounded bg-white/10 mb-4" />
                <div className="h-7 w-36 rounded bg-white/10" />
            </div>
        );
    }

    return (
        <div className="rounded-2xl p-5 transition-all hover:scale-[1.01] cursor-default"
            style={{
                background: cfg.gradient,
                border: `1px solid ${cfg.border}`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <span className="text-[10px] font-bold tracking-widest" style={{ color: cfg.tag, background: cfg.tagBg, padding: '2px 8px', borderRadius: '999px' }}>
                        {cfg.label}
                    </span>
                </div>
                <div className="h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: cfg.iconBg, boxShadow: cfg.iconShadow }}
                >
                    <span className="text-white">{icon}</span>
                </div>
            </div>

            <p className="text-2xl font-black tracking-tight" style={{ color: cfg.value }}>
                {Number(value).toLocaleString('vi-VN')}
                <span className="text-base font-semibold ml-1 opacity-70"> ₫</span>
            </p>

            {growth !== undefined && (
                <div className="flex items-center gap-1.5 mt-2">
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                        style={{
                            color: growth >= 0 ? '#10b981' : '#ef4444',
                            background: growth >= 0 ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)',
                        }}
                    >
                        {growth >= 0 ? '↑' : '↓'} {Math.abs(growth).toFixed(1)}%
                    </span>
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>so với tháng trước</span>
                </div>
            )}
        </div>
    );
}
