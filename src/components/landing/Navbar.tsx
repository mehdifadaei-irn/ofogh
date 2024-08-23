"use client";

import * as React from "react";
import { Leaf, Moon, Sprout, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const { setTheme, theme } = useTheme();
  console.log(theme);
  return (
    <header className="bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="flex flex-row justify-between container max-w-7xl ">
        <Link href={"/"}>
          <Leaf color="#000" size={35} />
        </Link>
        <Link href={"sign-in"} className={buttonVariants()}>
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
