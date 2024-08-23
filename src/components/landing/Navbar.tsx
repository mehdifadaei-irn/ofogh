"use client";

import * as React from "react";
import { Leaf, Moon, Sprout, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const token = localStorage.getItem("token");
  return (
    <header className="bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="flex flex-row justify-between container max-w-7xl ">
        <Link href={"/"}>
          <Leaf color="#000" size={35} />
        </Link>
        {token ? (
          <div className="flex flex-row gap-x-5">
            <Link
              href={"dashboard"}
              className="flex items-center justify-center underline"
            >
              dashboard
            </Link>
            <Button
              variant={"destructive"}
              onClick={() => {
                localStorage.removeItem("token");
                router.refresh();
              }}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <>
            <Link href={"sign-in"} className={buttonVariants()}>
              Sign In
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
