'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ArrowLeftRight, PiggyBank, Target, BarChart3 } from "lucide-react";

const bottomNavItems = [
    { href: '/', label: 'Tổng quan', icon: LayoutDashboard },
    { href: '/giao-dich', label: 'Giao dịch', icon: ArrowLeftRight },
    { href: '/ngan-sach', label: 'Ngân sách', icon: PiggyBank },
    { href: '/muc-tieu', label: 'Mục tiêu', icon: Target },
    { href: '/bao-cao', label: 'Báo cáo', icon: BarChart3 },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40" style={{
            background: 'rgba(12,16,34,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            paddingBottom: 'env(safe-area-inset-bottom)',
        }}>
            <div className="flex items-center justify-around h-16 px-2">
                {bottomNavItems.map(({ href, label, icon: Icon }) => {
                    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all min-w-0"
                        >
                            {isActive ? (
                                <div className="h-8 w-8 rounded-xl flex items-center justify-center"
                                    style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))', border: '1px solid rgba(16,185,129,0.25)' }}
                                >
                                    <Icon className="h-4 w-4" style={{ color: '#10b981' }} strokeWidth={2.5} />
                                </div>
                            ) : (
                                <div className="h-8 w-8 rounded-xl flex items-center justify-center">
                                    <Icon className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.35)' }} />
                                </div>
                            )}
                            <span className="text-[10px] font-medium leading-none truncate transition-all"
                                style={{ color: isActive ? '#10b981' : 'rgba(255,255,255,0.35)' }}
                            >
                                {label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
