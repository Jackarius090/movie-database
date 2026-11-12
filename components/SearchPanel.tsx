"use client";

import { useQuery } from "@tanstack/react-query";
import { movieSchema } from "@/lib/schemas/movie";

import MovieCard from "../components/MovieCard";
import FilterPanel from "@/components/FilterPanel";

export default function SearchPanel() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const response = await fetch("/api/movies");

      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }

      return movieSchema.parse(await response.json());
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
      <FilterPanel />
      <MovieCard data={data} />
    </section>
  );
}
