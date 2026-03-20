'use client';

import Link from "next/link";
import { GiaoDich } from "@/types";
import { format, parseISO } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";

interface RecentTransactionsProps {
    transactions: GiaoDich[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="rounded-2xl p-5" style={{ background: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>Giao dịch gần nhất</h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>5 giao dịch mới nhất</p>
                </div>
                <Link href="/giao-dich"
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                    style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}
                >
                    Xem tất cả →
                </Link>
            </div>

            {transactions.length === 0 ? (
                <p className="text-center text-sm py-8" style={{ color: 'var(--muted-foreground)' }}>Chưa có giao dịch nào</p>
            ) : (
                <div className="space-y-2">
                    {transactions.map(gd => {
                        const isIncome = gd.loai === 'thu';
                        return (
                            <div key={gd.id}
                                className="flex items-center gap-3 p-3 rounded-xl group transition-all hover:bg-white/5"
                                style={{ border: '1px solid rgba(255,255,255,0.04)' }}
                            >
                                {/* Icon */}
                                <div className="h-10 w-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                                    style={{ background: `${gd.danh_muc?.mau_sac || '#10b981'}18`, border: `1px solid ${gd.danh_muc?.mau_sac || '#10b981'}25` }}
                                >
                                    {gd.danh_muc?.bieu_tuong || (isIncome ? '📈' : '📉')}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                                        {gd.noi_dung || gd.danh_muc?.ten || 'Giao dịch'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                                            {format(parseISO(gd.ngay_giao_dich), 'dd/MM/yyyy')}
                                        </span>
                                        {gd.danh_muc && (
                                            <>
                                                <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
                                                <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{gd.danh_muc.ten}</span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Amount */}
                                <div className="text-right flex-shrink-0">
                                    <p className="text-sm font-black" style={{ color: isIncome ? '#10b981' : '#ef4444' }}>
                                        {isIncome ? '+' : '-'}{gd.so_tien.toLocaleString('vi-VN')} ₫
                                    </p>
                                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full"
                                        style={{ background: isIncome ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.1)', color: isIncome ? '#10b981' : '#ef4444' }}
                                    >
                                        {isIncome ? 'Thu' : 'Chi'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
