"use client";

import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import { useDrops } from "@/hooks/useDrops";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { drops, loading } = useDrops();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-pink animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black selection:bg-brand-pink/30">

      {/* Hero Section */}
      <Hero />

      {/* Featured Drops (Bento Grid) */}
      <div className="relative z-10 mt-20 md:-mt-20 pb-20">
        <BentoGrid drops={drops} />
      </div>

    </main>
  );
}

