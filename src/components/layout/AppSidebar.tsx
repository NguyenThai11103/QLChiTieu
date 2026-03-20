'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
    LayoutDashboard,
    ArrowLeftRight,
    Tag,
    PiggyBank,
    Target,
    Bell,
    BarChart3,
    LogOut,
    Settings,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { href: '/', label: 'Tổng quan', icon: LayoutDashboard },
    { href: '/giao-dich', label: 'Giao dịch', icon: ArrowLeftRight },
    { href: '/danh-muc', label: 'Danh mục', icon: Tag },
    { href: '/ngan-sach', label: 'Ngân sách', icon: PiggyBank },
    { href: '/muc-tieu', label: 'Mục tiêu', icon: Target },
    { href: '/nhac-nho', label: 'Nhắc nhở', icon: Bell },
    { href: '/bao-cao', label: 'Báo cáo', icon: BarChart3 },
];

interface AppSidebarProps {
    className?: string;
    setOpen?: (open: boolean) => void;
}

export function AppSidebar({ className, setOpen }: AppSidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = async () => {
        try { await authService.logout(); } catch { }
        logout();
        toast.success('Đã đăng xuất');
        router.push('/login');
    };

    return (
        <aside className={cn("flex flex-col", className)}
            style={{ background: 'var(--sidebar)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
        >
            {/* Logo */}
            <div className="h-16 flex items-center px-5 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 4px 14px rgba(16,185,129,0.35)' }}
                    >
                        <TrendingUp className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-sm leading-none" style={{ color: 'var(--sidebar-foreground)' }}>QLChiTieu</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>Quản lý tài chính</p>
                    </div>
                </div>
            </div>

            {/* Label */}
            <div className="px-5 pt-5 pb-1">
                <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: 'var(--muted-foreground)' }}>Menu</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen?.(false)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                                isActive ? "text-white" : "hover:bg-white/5"
                            )}
                            style={isActive ? {
                                background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))',
                                color: '#10b981',
                                boxShadow: 'inset 0 0 0 1px rgba(16,185,129,0.2)',
                            } : { color: 'var(--muted-foreground)' }}
                        >
                            <Icon className={cn("h-4 w-4 flex-shrink-0 transition-colors", isActive ? "text-emerald-400" : "group-hover:text-foreground")} />
                            <span className={isActive ? "text-emerald-300 font-semibold" : ""}>{label}</span>
                            {isActive && (
                                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Divider */}
            <div className="mx-4" style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '0 16px 8px' }} />

            {/* Bottom */}
            <div className="px-3 pb-4 space-y-0.5 flex-shrink-0">
                <Link
                    href="/ho-so"
                    onClick={() => setOpen?.(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                    style={{ color: 'var(--muted-foreground)' }}
                >
                    <Settings className="h-4 w-4" />
                    Cài đặt
                </Link>

                {/* User row */}
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
                    >
                        {user?.ho_va_ten?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                            {user?.ho_va_ten || 'Người dùng'}
                        </p>
                        <p className="text-xs truncate" style={{ color: 'var(--muted-foreground)' }}>
                            {user?.email || 'demo@example.com'}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="h-7 w-7 rounded-lg flex items-center justify-center transition-all hover:bg-red-500/20 hover:text-red-400"
                        style={{ color: 'var(--muted-foreground)' }}
                    >
                        <LogOut className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
