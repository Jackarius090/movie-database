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
import { Label } from "@/components/ui/label";

export default function FilterPanel() {
  const years = Array.from(
    { length: new Date().getFullYear() - 1950 + 1 },
    (_, i) => String(new Date().getFullYear() - i),
  );

  return (
    <section className="flex justify-center items-center border gap-6 p-4">
      <div className="flex">
        <Label htmlFor="movie-name">Movie Name</Label>
        <Input
          id="movie-name"
          name="movie-name"
          placeholder="Enter a movie name"
        />
      </div>
      <div className="flex">
        <Select>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
