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
        try {
            await authService.logout();
        } catch { }
        logout();
        toast.success('Đã đăng xuất');
        router.push('/login');
    };

    return (
        <aside className={cn("flex flex-col bg-card border-r border-border", className)}>
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-primary-foreground text-sm font-black">₫</span>
                    </div>
                    <div>
                        <p className="font-bold text-foreground text-sm leading-none">QLChiTieu</p>
                        <p className="text-xs text-muted-foreground leading-none mt-0.5">Quản lý chi tiêu</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
                    return (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setOpen?.(false)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            )}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {label}
                        </Link>
                    );
                })}
            </nav>

            {/* User info + logout */}
            <div className="border-t border-border p-3 space-y-1 flex-shrink-0">
                <Link
                    href="/ho-so"
                    onClick={() => setOpen?.(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                    <Settings className="h-4 w-4" />
                    Cài đặt
                </Link>
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {user?.ho_va_ten?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate">{user?.ho_va_ten}</p>
                        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </aside>
    );
}
