'use client';

import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Menu, Bell, User as UserIcon, TrendingUp } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen" style={{ background: 'var(--background)' }}>
            {/* Desktop Sidebar */}
            <AppSidebar className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 z-50 h-screen" />

            <div className="flex-1 flex flex-col lg:pl-64">
                {/* Top Header */}
                <header className="h-16 sticky top-0 z-40 flex items-center px-4 md:px-6 justify-between"
                    style={{
                        background: 'rgba(18,22,42,0.85)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    {/* Left: Mobile menu + brand */}
                    <div className="flex items-center gap-3">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <button className="lg:hidden h-9 w-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10"
                                    style={{ color: 'var(--muted-foreground)' }}
                                >
                                    <Menu className="h-5 w-5" />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64 border-none shadow-2xl">
                                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                                <SheetDescription className="sr-only">Điều hướng các chức năng quản lý chi tiêu</SheetDescription>
                                <AppSidebar setOpen={setOpen} className="w-full h-full border-none" />
                            </SheetContent>
                        </Sheet>

                        {/* Mobile brand */}
                        <div className="lg:hidden flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 2px 10px rgba(16,185,129,0.3)' }}
                            >
                                <TrendingUp className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-bold text-sm" style={{ color: 'var(--foreground)' }}>QLChiTieu</span>
                        </div>
                    </div>

                    {/* Right: Bell + user */}
                    <div className="flex items-center gap-2">
                        <Link href="/nhac-nho"
                            className="h-9 w-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 relative"
                            style={{ color: 'var(--muted-foreground)' }}
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-background" />
                        </Link>

                        <div className="h-8 w-px mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

                        <Link href="/ho-so" className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all hover:bg-white/5">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
                            ) : (
                                <div className="h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}
                                >
                                    {user?.ho_ten?.charAt(0) || <UserIcon className="h-4 w-4" />}
                                </div>
                            )}
                            <div className="hidden sm:block">
                                <p className="text-xs font-semibold leading-none" style={{ color: 'var(--foreground)' }}>
                                    {user?.ho_ten || 'Demo User'}
                                </p>
                                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                                    {user?.email || 'demo@example.com'}
                                </p>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Main content */}
                <main className="flex-1 p-4 md:p-6 pb-24 lg:pb-8"
                    style={{ background: 'var(--background)' }}
                >
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                <BottomNav />
            </div>
        </div>
    );
}
