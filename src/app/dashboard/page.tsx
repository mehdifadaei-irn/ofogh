"use client";
import React from "react";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
  price: z.string().min(2).max(50),
  phonenumber: z.string().min(2).max(50),
});

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
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCustomeContext } from "@/hooks/useCustomeContext";
import Map from "@/components/landing/Map";
import { toast } from "sonner";

const page = () => {
  const { lang, lat } = useCustomeContext();
  const routre = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      phonenumber: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["create"],
    mutationFn: async ({
      title,
      description,
      phonenumber,
      position1,
      price,
      position2,
      creator,
    }: any) => {
      const data = await axios.post("http://localhost:3000/api/states", {
        title,
        description,
        phonenumber,
        position1,
        price,
        position2,
        creator,
      });

      return data.data;
    },
    onSuccess: (e: any) => {
      localStorage.setItem("token", e.token);
      routre.replace("/");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(lat, lang, "in");
    if (!lang) {
      toast.error("please select a location");
    } else {
      mutate({
        title: values.title,
        description: values.description,
        phonenumber: values.phonenumber,
        position1: lat,
        price: values.price,
        position2: lang,
        creator: localStorage.getItem("token"),
      });
    }
  }
  return (
    <main className="container max-w-7xl">
      <h1 className="mt-6 font-bold text-4xl w-full text-center">
        Create Your State
      </h1>
      <div className="flex flex-row w-full justify-between">
        <Map title="" pos1={48.86} pos2={2.3522} height={60} />,
        <div className="md:w-1/3 w-full mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                      <Input placeholder="price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phonenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>phonenumber</FormLabel>
                    <FormControl>
                      <Input placeholder="phonenumber" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default page;
