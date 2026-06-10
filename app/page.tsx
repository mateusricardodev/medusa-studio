import Hero from "@/components/home/Hero";
import Sobre from "@/components/home/Sobre";
import Services from "@/components/home/Services";
import Reviews from "@/components/home/Reviews";
import Location from "@/components/home/Location";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Sobre />
      <Services />
      <Reviews />
      <Location />
    </>
  );
}
