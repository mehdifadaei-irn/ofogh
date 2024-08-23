import Map from "@/components/landing/Map";
import { Button } from "@/components/ui/button";
import { getStateById } from "@/lib/api";
import { StateProps } from "@/types";
import { Pencil, Trash2 } from "lucide-react";
import { FC } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PageProps {
  params: {
    id: string;
  };
}

const page: FC<PageProps> = async ({ params }) => {
  const {
    phonenumber,
    position1,
    position2,
    price,
    title,
    description,
  }: StateProps = await getStateById(params.id);
  return (
    <div className="container max-w-7xl flex items-center">
      <div className=" w-full h-full mt-10 flex flex-row rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ">
        <Map title={title} pos1={position1} pos2={position2} height={60} />
        <ul className="w-[20%] flex items-center my-6 flex-col px-4 justify-between">
          <li>
            <p className="font-semibold text-lg text-neutral-900">{title}</p>
            <p className="text-muted-foreground">{description}</p>
          </li>
          <li className="flex items-start  w-full h-32 flex-col justify-between">
            <p className="text-right font-medium text-green-600">{price} $</p>
            <p className="text-right font-medium text-neutral-700">
              {phonenumber}
            </p>
            <div className="flex flex-row  w-full items-end justify-end gap-x-5 ">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="icon"
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit State</DialogTitle>
                    <DialogDescription>
                      Make changes to your State here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Username
                      </Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                className="rounded-full"
                size="icon"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default page;
