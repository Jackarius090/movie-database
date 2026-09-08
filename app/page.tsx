import SearchPanel from "@/components/SearchPanel";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-8">
      <header>
        <h1 className="text-5xl p-8">Movies database</h1>
      </header>
      <SearchPanel />
    </main>
  );
}
