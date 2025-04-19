import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
      {/* <Footer/> */}
    </div>
  );
}
