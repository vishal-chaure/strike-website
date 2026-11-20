import { site } from "@/config/site";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <h1 className="text-4xl font-bold">{site.name}</h1>
    </main>
  );
}
