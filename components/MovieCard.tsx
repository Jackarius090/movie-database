"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export default function MovieCard() {
  const [isFavourite, setFavourite] = useState(false);

  return (
    <section className="flex border rounded-md p-4 gap-16">
      <div>Movie name</div>
      <div>Genre</div>
      <div>Rating</div>
      <div>Year</div>
      <div>Director</div>
      <div>Stars</div>
      <div>Length</div>

      <Button variant="ghost" onClick={() => setFavourite((prev) => !prev)}>
        <Star size={48} fill={isFavourite ? "#000" : "none"} />
      </Button>
    </section>
  );
}

//
