import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { StateProps } from "@/types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Map from "./Map";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

const StateCard = ({
  description,
  title,
  position1,
  position2,
  price,
  phonenumber,
  creator,
  id,
}: StateProps) => {
  return (
    <Link href={`/state/${id}`}>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row justify-between">
          <div className="w-2/3">
            <Map pos1={position1} pos2={position2} title={title} />
          </div>
          <ul className="flex-1 justify-between flex flex-col items-end">
            <li className="text-right font-medium text-green-600">{price} $</li>
            <li className="text-right font-medium text-neutral-700">
              {phonenumber}
            </li>
            <li className="rounded-full w-7 h-7 bg-zinc-200 flex justify-center items-center">
              <CheckCheck size={20} color="#16a34a" />
            </li>
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StateCard;
