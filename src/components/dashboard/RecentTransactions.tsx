'use client';

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GiaoDich } from "@/types";
import { format, parseISO } from "date-fns";
import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentTransactionsProps {
    transactions: GiaoDich[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">Giao dịch gần nhất</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1 text-xs" asChild>
                    <Link href="/giao-dich">
                        Xem tất cả <ArrowRight className="h-3 w-3" />
                    </Link>
                </Button>
            </CardHeader>
            <CardContent>
                {transactions.length === 0 ? (
                    <p className="text-center text-muted-foreground text-sm py-6">Chưa có giao dịch nào</p>
                ) : (
                    <div className="space-y-3">
                        {transactions.map(gd => (
                            <div key={gd.id} className="flex items-center gap-3">
                                <div
                                    className="h-9 w-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
                                    style={{ backgroundColor: `${gd.danh_muc?.mau_sac}20` }}
                                >
                                    {gd.danh_muc?.bieu_tuong || (gd.loai === 'thu' ? '📈' : '📉')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-foreground truncate">
                                        {gd.noi_dung || gd.danh_muc?.ten || 'Giao dịch'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {format(parseISO(gd.ngay_giao_dich), 'dd/MM/yyyy')}
                                        {gd.danh_muc && ` · ${gd.danh_muc.ten}`}
                                    </p>
                                </div>
                                <div className={cn("flex items-center gap-1", gd.loai === 'thu' ? 'text-emerald-600' : 'text-red-500')}>
                                    {gd.loai === 'thu'
                                        ? <TrendingUp className="h-3 w-3" />
                                        : <TrendingDown className="h-3 w-3" />
                                    }
                                    <span className="text-sm font-semibold">
                                        {gd.loai === 'thu' ? '+' : '-'}{gd.so_tien.toLocaleString('vi-VN')} ₫
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
