import { StateContext } from "@/components/Providers";
import { useContext } from "react";

export function useCustomeContext() {
  const state = useContext(StateContext);

  if (state === undefined) {
    throw new Error("useContext must be used with a StateContext");
  }

  return state;
}
