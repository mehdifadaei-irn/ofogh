import { EditStateProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { useCustomeContext } from "./useCustomeContext";

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  price: z.string().min(0),
  phonenumber: z.string().min(11, "at least 11 digit"),
});

export function useEditState({
  title,
  description,
  phonenumber,
  price,
  id,
}: EditStateProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      description: description,
      //@ts-ignore
      price: price,
      //@ts-ignore
      phonenumber: phonenumber,
    },
  });

  const { lang, lat, setRef } = useCustomeContext();

  const {
    data: editRes,
    mutate,
    isPending,
  } = useMutation({
    mutationKey: ["edit"],
    mutationFn: async ({
      title,
      description,
      phonenumber,
      price,
      position1,
      position2,
    }: any) => {
      const { data } = await axios.patch("http://localhost:3000/api/states", {
        id: id,
        title: title,
        description,
        phonenumber,
        price: price,
        position1: position1,
        position2: position2,
      });
      return data;
    },
    onSuccess: () => {
      setRef((prev: number) => prev + 1);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate({
      title: values.title,
      description: values.description,
      phonenumber: values.phonenumber,
      price: values.price,
      position1: lat,
      position2: lang,
    });
  }

  return {
    form,
    onSubmit,
    isPending,
  };
}
