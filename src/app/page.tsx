import StateCard from "@/components/landing/StateCard";
import { getStates } from "@/lib/api";
import { StateProps } from "@/types";

export default async function Home() {
  const data: StateProps[] = await getStates();
  return (
    <main className="max-w-7xl container flex justify-center items-center ">
      <div className="grid justify-center items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-8 ">
        {data.map((state) => (
          <StateCard {...state} id={state.id} />
        ))}
      </div>
    </main>
  );
}
