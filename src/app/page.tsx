"use client";
import StateCard from "@/components/landing/StateCard";
import { useCustomeContext } from "@/hooks/useCustomeContext";
import { getStates } from "@/lib/api";
import { StateProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  // const data: StateProps[] = await getStates();

  const cotex = useCustomeContext();

  const { isLoading, data, refetch } = useQuery<StateProps[]>({
    queryKey: ["aStates"],
    queryFn: async () => {
      const daaa = await axios.get(`http://localhost:3000/api/states`);

      const res = daaa.data;

      return res;
    },
  });

  const onSubmitRefetch = () => refetch();

  useEffect(() => {
    onSubmitRefetch();
  }, [cotex]);

  if (isLoading) {
    return null;
  }

  return (
    <main className="max-w-7xl container flex justify-center items-center ">
      <div className="grid justify-center items-center lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 mt-8 ">
        {data?.map((state) => (
          <StateCard {...state} id={state.id} />
        ))}
      </div>
    </main>
  );
}
