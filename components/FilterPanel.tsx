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

export default function FilterPanel() {
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
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="year" />
          </SelectTrigger>
          <SelectContent className="bg-background" side="bottom">
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>
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
      </div>
    </section>
  );
}
