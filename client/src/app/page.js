import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
}
