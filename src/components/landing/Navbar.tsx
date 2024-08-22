"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  return (
    <header>
      <Button variant="outline" size="icon" onClick={() => setTheme("light")}>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => setTheme("dark")}
      >
        <span className="sr-only">Toggle dark</span>
      </Button>
      <Button variant="secondary" size="icon" onClick={() => setTheme("light")}>
        <span className="sr-only">Toggle light</span>
      </Button>
    </header>
  );
};

export default Navbar;
