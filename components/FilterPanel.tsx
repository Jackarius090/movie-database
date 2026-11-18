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
  onYearChange: (year: number | undefined) => void;
};

export default function FilterPanel({
  filters,
  onYearChange,
}: FilterPanelProps) {
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
        <Input placeholder="Enter a movie name" />
        <Select
          value={filters.year?.toString() ?? "all"}
          onValueChange={(value) =>
            onYearChange(value === "all" || value === null ? undefined : Number(value))
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
        <Input placeholder="Actor" />
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="genre" />
          </SelectTrigger>
          <SelectContent className="bg-background" side="bottom">
            <SelectGroup>
              <SelectLabel>Genre</SelectLabel>
              {genres.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>
          <Input id="rating" placeholder="rating" />
          <Label htmlFor="rating" className="whitespace-nowrap p-1">
            search for movies with your rating and above.
          </Label>
        </div>
      </div>
    </section>
  );
}
