"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

import { useDeleteState } from "@/hooks/useDeleteState";

const DeleteState = ({ id }: { id: string }) => {
  const { onSubmit, isPending } = useDeleteState();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="rounded-full" size="icon">
          <Trash2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[600px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete State</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          {/* <DialogClose asChild> */}
            <Button
              variant={"destructive"}
              onClick={() => onSubmit(id)}
              disabled={isPending}
            >
              Delete
            </Button>
          {/* </DialogClose> */}
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteState;
