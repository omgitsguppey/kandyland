"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, PlusCircle, LogOut, Package, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const ADMIN_EMAIL = "uylusjohnson@gmail.com";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.email !== ADMIN_EMAIL) {
                router.push("/");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, authLoading, router]);

    if (authLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 flex">
            {/* Sidebar */}
            <aside className="w-64 fixed left-0 top-20 bottom-0 bg-black/40 border-r border-white/10 backdrop-blur-xl p-6 flex flex-col z-40">
                <div className="mb-8">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Admin Console</h2>
                    <nav className="space-y-2">
                        <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/5 transition-colors group">
                            <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-brand-cyan transition-colors" />
                            <span className="font-medium">Overview</span>
                        </Link>
                        <Link href="/admin/drops" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/5 transition-colors group">
                            <Package className="w-5 h-5 text-gray-400 group-hover:text-brand-pink transition-colors" />
                            <span className="font-medium">Drops</span>
                        </Link>
                        <Link href="/admin/create" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/5 transition-colors group">
                            <PlusCircle className="w-5 h-5 text-gray-400 group-hover:text-brand-green transition-colors" />
                            <span className="font-medium">Create Drop</span>
                        </Link>
                        <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl text-white hover:bg-white/5 transition-colors group">
                            <Users className="w-5 h-5 text-gray-400 group-hover:text-brand-yellow transition-colors" />
                            <span className="font-medium">Users</span>
                        </Link>
                    </nav>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => logout()}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-[calc(100vh-80px)]">
                <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
