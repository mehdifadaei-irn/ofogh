import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Button>Submit</Button>
      <p className="dark:text-neutral-600 text-pink-600">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum, eligendi.
      </p>
    </main>
  );
}
