"use client";

import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";
import type { MovieFilters } from "@/lib/schemas/movie";

type FilterPanelProps = {
  filters: MovieFilters;
  onFiltersChange: (filters: MovieFilters) => void;
};

export default function FilterPanel({
  filters,
  onFiltersChange,
}: FilterPanelProps) {
  const updateFilter = <K extends keyof MovieFilters>(
    key: K,
    value: MovieFilters[K] | undefined,
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, i) => String(new Date().getFullYear() - i),
  );

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Reality-TV",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  return (
    <section className="flex justify-center items-center border gap-6 p-4">
      <div className="flex gap-4">
        <Input
          aria-label="Movie name"
          placeholder="Enter a movie name"
          value={filters.title ?? ""}
          onChange={(event) =>
            updateFilter("title", event.currentTarget.value || undefined)
          }
        />
        <Select
          value={filters.year?.toString() ?? "all"}
          onValueChange={(value) =>
            updateFilter(
              "year",
              value === "all" || value === null ? undefined : Number(value),
            )
          }
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Any year" />
          </SelectTrigger>
          <SelectContent className="bg-background" side="bottom">
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
              <SelectItem value="all">Any year</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          aria-label="Actor"
          placeholder="Actor"
          value={filters.actor ?? ""}
          onChange={(event) =>
            updateFilter("actor", event.currentTarget.value || undefined)
          }
        />
        <Select
          value={filters.genre ?? "all"}
          onValueChange={(value) =>
            updateFilter(
              "genre",
              value === "all" || value === null ? undefined : value,
            )
          }
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Any genre" />
          </SelectTrigger>
          <SelectContent className="bg-background" side="bottom">
            <SelectGroup>
              <SelectLabel>Genre</SelectLabel>
              <SelectItem value="all">Any genre</SelectItem>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          <Input
            id="rating"
            aria-label="Minimum rating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="rating"
            value={filters.minRating ?? ""}
            onChange={(event) =>
              updateFilter(
                "minRating",
                event.currentTarget.value === ""
                  ? undefined
                  : Number(event.currentTarget.value),
              )
            }
          />
          <Label htmlFor="rating" className="whitespace-nowrap p-1">
            search for movies with your rating and above.
          </Label>
        </div>
      </div>
    </section>
  );
}
