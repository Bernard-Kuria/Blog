import Topics from "@components/Topics";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="grid justify-center mt-[30px] gap-[100px]">
      <Hero />
      <Topics />
    </div>
  );
}
