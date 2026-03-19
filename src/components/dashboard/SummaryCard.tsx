'use client';

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardProps {
    title: string;
    value: number;
    growth?: number;
    icon: React.ReactNode;
    variant: 'income' | 'expense' | 'balance';
    loading?: boolean;
}

const variantStyles = {
    income: { bg: 'bg-emerald-50 dark:bg-emerald-950/20', icon: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40', value: 'text-emerald-600' },
    expense: { bg: 'bg-red-50 dark:bg-red-950/20', icon: 'text-red-500 bg-red-100 dark:bg-red-900/40', value: 'text-red-500' },
    balance: { bg: 'bg-blue-50 dark:bg-blue-950/20', icon: 'text-blue-600 bg-blue-100 dark:bg-blue-900/40', value: 'text-blue-600' },
};

export function SummaryCard({ title, value, growth, icon, variant, loading }: SummaryCardProps) {
    const styles = variantStyles[variant];

    if (loading) {
        return (
            <Card>
                <CardContent className="p-5">
                    <div className="h-4 w-24 bg-muted animate-pulse rounded mb-3" />
                    <div className="h-7 w-32 bg-muted animate-pulse rounded" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={cn("border-0 shadow-sm", styles.bg)}>
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className={cn("text-2xl font-bold mt-1", styles.value)}>
                            {value.toLocaleString('vi-VN')} ₫
                        </p>
                        {growth !== undefined && (
                            <div className="flex items-center gap-1 mt-1.5">
                                {growth >= 0 ? (
                                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500" />
                                )}
                                <span className={cn("text-xs font-medium", growth >= 0 ? 'text-emerald-500' : 'text-red-500')}>
                                    {Math.abs(growth).toFixed(1)}% so với tháng trước
                                </span>
                            </div>
                        )}
                    </div>
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center", styles.icon)}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
