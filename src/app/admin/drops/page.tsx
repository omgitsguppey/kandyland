"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Drop } from "@/types/db";
import { format } from "date-fns";
import { Trash2, Edit, Eye, MoreHorizontal, Calendar, Clock, Lock, Package } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDropsPage() {
    const [drops, setDrops] = useState<Drop[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "drops"), orderBy("validFrom", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const dropsData: Drop[] = [];
            snapshot.forEach((doc) => {
                dropsData.push({ id: doc.id, ...doc.data() } as Drop);
            });
            setDrops(dropsData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this drop? This cannot be undone.")) {
            try {
                await deleteDoc(doc(db, "drops", id));
            } catch (err) {
                console.error("Error deleting drop:", err);
                alert("Failed to delete drop.");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 rounded-full border-2 border-brand-pink border-t-transparent animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Manage Drops</h1>
                    <p className="text-gray-400">View and manage all content drops.</p>
                </div>
                <Link
                    href="/admin/create"
                    className="px-6 py-3 rounded-xl bg-brand-pink font-bold text-white hover:bg-brand-pink/80 transition-colors shadow-lg shadow-brand-pink/20"
                >
                    + Create Drop
                </Link>
            </header>

            <div className="glass-panel rounded-3xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/5 text-gray-400 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-bold">Drop Details</th>
                            <th className="px-6 py-4 font-bold">Schedule</th>
                            <th className="px-6 py-4 font-bold">Cost</th>
                            <th className="px-6 py-4 font-bold">Status</th>
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {drops.map((drop) => {
                            const now = Date.now();
                            let status = "expired";
                            let statusColor = "bg-red-500/10 text-red-400 border-red-500/20";

                            if (now < drop.validFrom) {
                                status = "scheduled";
                                statusColor = "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20";
                            } else if (now < drop.validUntil) {
                                status = "active";
                                statusColor = "bg-brand-green/10 text-brand-green border-brand-green/20";
                            }

                            return (
                                <tr key={drop.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-lg bg-zinc-800 overflow-hidden shrink-0 border border-white/10">
                                                {drop.imageUrl ? (
                                                    <img src={drop.imageUrl} alt={drop.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xl">🍬</div>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{drop.title}</div>
                                                <div className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{drop.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-300 flex items-center gap-2">
                                            <Calendar className="w-3 h-3 text-gray-500" />
                                            {format(drop.validFrom, "MMM d, HH:mm")}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            {format(drop.validUntil, "MMM d, HH:mm")}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1 font-mono font-bold text-brand-yellow">
                                            {drop.unlockCost}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold border capitalize", statusColor)}>
                                            {status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link
                                                href={`/admin/create?id=${drop.id}`}
                                                className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-brand-cyan transition-colors"
                                                title="Edit"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(drop.id)}
                                                className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {drops.length === 0 && (
                    <div className="p-12 text-center text-gray-500">
                        <Package className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>No drops found. Create your first one!</p>
                    </div>
                )}
            </div>
        </div >
    );
}
