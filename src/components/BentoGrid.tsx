"use client";

import { Drop } from "@/types/db";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Create a motion version of GlassCard
const MotionGlassCard = motion.create(GlassCard);

interface BentoGridProps {
    drops: Drop[];
}

export default function BentoGrid({ drops }: BentoGridProps) {
    if (!drops || drops.length === 0) return null;

    // We'll take top 5 for the bento layout
    const featured = drops.slice(0, 5);

    return (
        <section className="px-4 md:px-8 max-w-7xl mx-auto mb-24">
            <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-white mb-8 tracking-tight"
            >
                Featured Drops
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 h-auto md:h-[600px]">

                {/* Main Feature (Large, spans 2x2) */}
                {featured[0] && (
                    <MotionGlassCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="md:col-span-2 md:row-span-2 group relative p-5 md:p-8 flex flex-col justify-end border-white/10 overflow-hidden"
                        hoverEffect={true}
                    >
                        {/* Background Image with Gradient Overlay */}
                        <div className="absolute inset-0 z-0">
                            {featured[0].imageUrl ? (
                                <img src={featured[0].imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-brand-purple/20 to-brand-pink/20" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        </div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/20 text-brand-pink border border-brand-pink/20 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-3 md:mb-4">
                                <Clock className="w-3 h-3" /> Ends in {formatDistanceToNow(featured[0].validUntil)}
                            </div>
                            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">{featured[0].title}</h3>
                            <p className="text-gray-300 mb-4 md:mb-6 line-clamp-2 text-sm md:text-base">{featured[0].description}</p>
                            <Button variant="brand" className="rounded-full gap-2 w-full md:w-auto justify-center">
                                Unwrap Now <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </MotionGlassCard>
                )}

                {/* Secondary Features (Span 1) */}
                {featured.slice(1).map((drop, i) => (
                    <MotionGlassCard
                        key={drop.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                        className={cn(
                            "relative group p-6 flex flex-col justify-between",
                            i === 1 || i === 2 ? "md:col-span-1" : "md:col-span-1"
                        )}
                        hoverEffect={true}
                    >
                        <div className="absolute inset-0 z-0">
                            {/* Subtle geometric background or image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent group-hover:from-white/10 transition-colors" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                                    <Lock className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-brand-yellow font-bold font-mono text-sm">{drop.unlockCost} GD</span>
                            </div>

                            <div>
                                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-brand-cyan transition-colors">{drop.title}</h4>
                                <p className="text-xs text-gray-400 line-clamp-2">{drop.description}</p>
                            </div>
                        </div>
                    </MotionGlassCard>
                ))}
            </div>
        </section>
    );
}
