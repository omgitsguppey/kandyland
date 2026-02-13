"use client";

import { useState, useMemo } from "react";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import { DropGrid } from "@/components/DropGrid";
import StickyFilterBar from "@/components/StickyFilterBar";
import { useDrops } from "@/hooks/useDrops";
import { Loader2 } from "lucide-react";

const CATEGORIES = ["All", "New", "Ending Soon", "Hottest", "Rare"];

export default function Home() {
  const { drops, loading } = useDrops();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filtering Logic
  const filteredDrops = useMemo(() => {
    if (!drops) return [];

    let result = drops;

    // Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(drop =>
        drop.title.toLowerCase().includes(lowerQuery) ||
        drop.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Category Filter (Mock logic for now as database doesn't have categories yet)
    // In a real app, we'd check drop.tags or drop.category
    if (selectedCategory !== "All") {
      if (selectedCategory === "New") {
        // Sort by newest validFrom
        result = [...result].sort((a, b) => b.validFrom - a.validFrom);
      } else if (selectedCategory === "Ending Soon") {
        // Sort by soonest validUntil
        result = [...result].sort((a, b) => a.validUntil - b.validUntil);
      }
      // "Hottest" and "Rare" would need metrics, for now just return all
    }

    return result;
  }, [drops, searchQuery, selectedCategory]);

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

      {/* Featured Drops (Bento Grid) - Only show if not searching */}
      {!searchQuery && selectedCategory === "All" && (
        // Adjusted spacing: push down on mobile (mt-12), pull up on desktop (-mt-20)
        <div className="relative z-10 mt-20 md:-mt-20">
          <BentoGrid drops={drops} />
        </div>
      )}

      {/* Sticky Filter Bar */}
      <StickyFilterBar
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* All Drops Grid */}
      <section id="drops" className="px-4 md:px-8 max-w-7xl mx-auto pb-24 mt-8 min-h-[500px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {searchQuery ? `Search Results: "${searchQuery}"` : selectedCategory === "All" ? "All Collections" : `${selectedCategory} Drops`}
          </h2>
          <span className="text-gray-500 text-sm font-mono">{filteredDrops.length} items</span>
        </div>

        <DropGrid drops={filteredDrops} loading={loading} isSearching={!!searchQuery} />
      </section>

    </main>
  );
}
