"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { CandyIcon } from "@/components/ui/Icon";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";

export default function Hero() {
    const { user } = useAuth();
    const { openAuthModal } = useUI();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-[60vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-0">
            {/* Background Gradients (True Black Theme) */}
            <div className="absolute inset-0 bg-black">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-brand-pink/10 rounded-full blur-[120px] opacity-30"></div>
            </div>

            {/* Parallax Content */}
            <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-4 md:mb-8 flex justify-center"
                >
                    <div className="p-4 md:p-8 relative">
                        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl"></div>
                        <CandyIcon size="xl" className="drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-75 md:scale-100" />
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-3 md:mb-6"
                >
                    KandyDrops
                </motion.h1>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-base md:text-2xl text-gray-400 font-medium max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-10 leading-relaxed px-4"
                >
                    <div className="flex items-center gap-2 text-sm md:text-base font-medium tracking-wide">
                        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                        <span className="text-white">Collect. Unwrap. Own the moment.</span>
                    </div>
                </motion.p>


                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    {user ? (
                        <Link href="/dashboard">
                            <Button size="lg" variant="brand" className="rounded-full px-8 py-3 w-full sm:w-auto text-base md:text-lg shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] transition-shadow">
                                Unwrap Now
                            </Button>
                        </Link>
                    ) : (
                        <Button
                            onClick={openAuthModal}
                            size="lg"
                            variant="brand"
                            className="rounded-full px-8 py-3 w-full sm:w-auto text-base md:text-lg shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] transition-shadow"
                        >
                            Unwrap Now
                        </Button>
                    )}
                    <Button size="lg" variant="glass" className="rounded-full px-8 py-3 w-full sm:w-auto text-base md:text-lg hover:bg-white/10">
                        What's a KandyDrop?
                    </Button>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent"></div>
            </motion.div>
        </section>
    );
}
