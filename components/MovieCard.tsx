"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import type { Movies } from "@/lib/schemas/movie";

type MovieCardProps = {
  movie: Movies[number];
};

export default function MovieCard({ movie }: MovieCardProps) {
  const [isFavourite, setFavourite] = useState(false);

  return (
    <header className="grid grid-cols-7 border rounded-md p-4 gap-16">
      <div>Movie name</div>
      <div>Genre</div>
      <div>Rating</div>
      <div>Year</div>
      <div>Director</div>
      <div>Length (mins)</div>
      <div>Stars</div>
      <h1>{movie.title}</h1>
      <p>{movie.genre}</p>
      <p>{movie.rating}</p>
      <p>{movie.year}</p>
      <p>{movie.director_and_stars}</p>
      <p>{movie.runtime}</p>
      <Button
        variant="ghost"
        onClick={() => setFavourite((prev) => !prev)}
      >
        <Star size={48} fill={isFavourite ? "#000" : "none"} />
      </Button>
    </header>
  );
}
