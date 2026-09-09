"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export default function MovieCard({ data }) {
  const [isFavourite, setFavourite] = useState(false);

  return (
    <section className="flex flex-col ">
      <header className="grid grid-cols-7 border rounded-md p-4 gap-16">
        <div>Movie name</div>
        <div>Genre</div>
        <div>Rating</div>
        <div>Year</div>
        <div>Director</div>
        <div>Length (mins)</div>
        <div>Stars</div>
        <h1>{data.title}</h1>
        <p>{data.genre}</p>
        <p>{data.rating}</p>
        <p>{data.year}</p>
        <p>{data.director_and_stars}</p>
        <p>{data.runtime}</p>
        <Button variant="ghost" onClick={() => setFavourite((prev) => !prev)}>
          <Star size={48} fill={isFavourite ? "#000" : "none"} />
        </Button>
      </header>
    </section>
  );
}

//
