"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { ThemeProvider } from "./ui/theme-provider";
import { Toaster } from "sonner";
import { createContext } from "react";

const client = new QueryClient();
interface StateContextType {
  lat: string | null;
  lang: string | null;
  setlang: any;
  setlat: any;
  ref: number;
  setRef: any;
}

export const StateContext = createContext<StateContextType | undefined>(
  undefined
);

const Providers = ({ children }: PropsWithChildren<{}>) => {
  const [lat, setlat] = useState(null);
  const [lang, setlang] = useState(null);
  const [ref, setRef] = useState<number>(0);

  return (
    <QueryClientProvider client={client}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <StateContext.Provider
          value={{
            lat,
            setRef,
            ref,
            lang,
            setlang,
            setlat,
          }}
        >
          <Toaster richColors position="top-right" />
          {children}
        </StateContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
