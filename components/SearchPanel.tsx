"use client";

import MovieCard from "../components/MovieCard";
import FilterPanel from "@/components/FilterPanel";

export default function SearchPanel() {
  return (
    <section className="flex flex-col gap-4">
      <FilterPanel />
      <MovieCard />
    </section>
  );
}
