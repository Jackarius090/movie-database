import MovieCard from "./components/MovieCard";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center">
      <header>
        <h1 className="text-5xl p-8">Movies database</h1>
      </header>
      <section>
        <MovieCard />
      </section>
    </main>
  );
}
