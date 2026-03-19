'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-border safe-area-bottom">
            <div className="flex items-center justify-around h-16">
                {bottomNavItems.map(({ href, label, icon: Icon }) => {
                    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg transition-all min-w-0",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                            <span className="text-[10px] font-medium leading-none truncate">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
