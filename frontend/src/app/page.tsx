import ActionGrid from "../components/features/ActionGrid";
import FloodMapSection from "../components/features/FloodMapSection";
import Hero from "../components/features/Hero";
import Stats from "../components/features/Stats";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50/50">
      <Hero />
      <Stats />
      
      
      {/* Ajout de la section Carte ici */}
      <FloodMapSection />

      <ActionGrid />

      
    </main>
  );
}