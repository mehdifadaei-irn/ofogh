"use client";
import React from "react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email("please enter valid email"),
  password: z.string().min(2, "password must be stronger").max(50),
});

const page = () => {
  const routre = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async ({ email, password }: any) => {
      const data = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      return data.data;
    },
    onSuccess: (e: any) => {
      localStorage.setItem("token", e.token);
      routre.replace("/");
    },
    onError: (e: any) => {
      console.log(e);
      toast.error("somthing went wrong!!!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({ email: values.email, password: values.password });
  }

  return (
    <main className="container max-w-7xl">
      <h1 className="w-full text-center font-bold text-4xl tracking-wide mt-6">
        Log In
      </h1>

      <div className="border shadow-sm md:w-1/3 w-full mx-auto px-10 py-5 mt-14">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <Link href={"/sign-up"} className="underline text-blue-600">
                Register
              </Link>
              <Button type="submit" disabled={isPending}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default page;
