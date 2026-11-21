"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { moviesSchema, type MovieFilters } from "@/lib/schemas/movie";

import MovieCard from "../components/MovieCard";
import FilterPanel from "@/components/FilterPanel";

export default function SearchPanel() {
  const [filters, setFilters] = useState<MovieFilters>({});

  const { data, isPending, isError } = useQuery({
    queryKey: ["movies", filters],
    queryFn: async () => {
      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== "") {
          params.set(key, String(value));
        }
      }

      const query = params.toString();
      const response = await fetch(`/api/movies${query ? `?${query}` : ""}`);

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      return moviesSchema.parse(await response.json());
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong.</p>;
  }

  return (
    <section className="flex flex-col gap-4">
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
      />
      <div className="flex flex-col gap-4">
        {data.map((movie, index) => (
          <MovieCard key={`${movie.title ?? "movie"}-${index}`} movie={movie} />
        ))}
      </div>
    </section>
  );
}
