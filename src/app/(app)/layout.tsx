'use client';

import { useAuthStore } from "@/store/auth.store";
import { useState } from "react";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Menu, Bell, User as UserIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-muted/30">
            {/* Desktop Sidebar */}
            <AppSidebar className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 z-50 h-screen" />

            <div className="flex-1 flex flex-col lg:pl-64">
                {/* Top Header */}
                <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border/60 sticky top-0 z-40 flex items-center px-4 md:px-6 justify-between">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu */}
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64 border-none shadow-2xl">
                                <SheetTitle className="sr-only">Menu điều hướng</SheetTitle>
                                <SheetDescription className="sr-only">Điều hướng các chức năng quản lý chi tiêu</SheetDescription>
                                <AppSidebar setOpen={setOpen} className="w-full h-full border-none" />
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center gap-2 lg:hidden">
                            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground text-xs font-bold">₫</span>
                            </div>
                            <span className="font-bold text-sm text-foreground">QLChiTieu</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" asChild>
                            <Link href="/nhac-nho">
                                <Bell className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="h-8 w-px bg-border mx-1" />
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold text-foreground leading-none">{user?.ho_va_ten}</span>
                                <span className="text-xs text-muted-foreground">{user?.email}</span>
                            </div>
                            {user?.anh_dai_dien ? (
                                <img src={user.anh_dai_dien} alt="avatar" className="h-8 w-8 rounded-full object-cover ring-2 ring-border" />
                            ) : (
                                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold ring-2 ring-border">
                                    {user?.ho_va_ten?.charAt(0) || <UserIcon className="h-4 w-4" />}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 pb-20 lg:pb-6 animate-in fade-in duration-300">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Bottom Nav for Mobile */}
                <BottomNav />
            </div>
        </div>
    );
}
