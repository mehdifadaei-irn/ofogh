"use client";
import Map from "@/components/landing/Map";
import { Button } from "@/components/ui/button";
import { getStateById } from "@/lib/api";
import { StateProps } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { FC, useEffect } from "react";

import EditState from "@/components/landing/EditState";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCustomeContext } from "@/hooks/useCustomeContext";
import DeleteState from "@/components/landing/DeleteState";

interface PageProps {
  params: {
    id: string;
  };
}

const page: FC<PageProps> = ({ params }) => {
  // const {
  //   phonenumber,
  //   position1,
  //   position2,
  //   price,
  //   title,
  //   description,
  // }: StateProps = await getStateById(params.id);

  const cotex = useCustomeContext();

  const { isLoading, data, refetch } = useQuery<any>({
    queryKey: ["sd", params.id],
    queryFn: async () => {
      const daaa = await axios.get(
        `http://localhost:3000/api/states?id=${params.id}`
      );

      const res = daaa.data.data;

      return res;
    },
  });

  const onSubmitRefetch = () => refetch();

  useEffect(() => {
    onSubmitRefetch();
  }, [cotex]);

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="container max-w-7xl flex items-center">
      <div className=" w-full h-full mt-10 flex md:flex-row flex-col rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ">
        <Map
          title={data?.title}
          pos1={data?.position1}
          pos2={data?.position2}
          height={60}
        />
        <ul className="md:w-[20%] w-full flex items-center my-6 md:flex-col px-4 justify-between">
          <li>
            <p className="font-semibold text-lg text-neutral-900">
              {data?.title}
            </p>
            <p className="text-muted-foreground">{data?.description}</p>
          </li>
          <li className="flex md:items-start items-end  w-full h-32 flex-col justify-between">
            <p className=" font-medium text-green-600 text-right">
              {data?.price} $
            </p>
            <p className="text-right md:font-medium font-normal max-md:text-sm text-neutral-700">
              {data?.phonenumber}
            </p>
            <div className="flex flex-row  w-full items-end justify-end gap-x-5 ">
              <EditState
                phonenumber={data?.phonenumber}
                price={data?.price}
                id={params.id}
                title={data?.title}
                description={data?.description}
              />
              <DeleteState id={params.id} />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
