import { EditStateProps } from "@/types";
import axios from "axios";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { useCustomeContext } from "./useCustomeContext";
import { useRouter } from "next/navigation";

export function useDeleteState() {
  const router = useRouter();
  const { setRef } = useCustomeContext();
  const {
    data: editRes,
    mutate,
    isPending,
  } = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (itemId: string) => {
      const { data } = await axios.delete("http://localhost:3000/api/states", {
        data: { id: itemId },
      });
      return data;
    },
    onSuccess: () => {
      setRef((prev: number) => prev + 1);
      // console.log("su");
      router.replace("/");
    },
  });

  function onSubmit(itemId: string) {
    mutate(itemId);
  }

  return {
    onSubmit,
    isPending,
  };
}
