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

const formSchema = z.object({
  email: z.string().email("please enter valid email"),
  username: z.string().min(2, "username must be at least 2 char").max(50),
  password: z.string().min(2, "password must be stronger").max(50),
});

const page = () => {
  const routre = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["register"],
    mutationFn: async ({ username, email, password }: any) => {
      const data = await axios.post(
        "http://localhost:3000/api/users/register",
        { username, email, password }
      );

      return data.data;
    },
    onSuccess: (e: any) => {
      localStorage.setItem("token", e.token);
      routre.replace("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      username: values.username,
      email: values.email,
      password: values.password,
    });
  }
  return (
    <main className="container max-w-7xl">
      <h1 className="w-full text-center font-bold text-4xl tracking-wide mt-6">
        Register
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
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
              <Link href={"/sign-in"} className="underline text-blue-600">
                Sign-in
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
