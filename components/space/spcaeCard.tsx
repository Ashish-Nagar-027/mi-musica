"use client";

import { GiSoundWaves } from "react-icons/gi";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";
import type { spaceTypes } from "@/app/(root)/(protected)/spaces/page";

function SpaceCard({ space }: {space: spaceTypes}) {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  console.log(space);
  const createdAt = space.createdAt
    ? new Date(space.createdAt).toLocaleString()
    : "";

  const handleDeleteSpace = async () => {
    try {
      console.log("Deleting space");
      setIsDeleting(true);
      await fetch("/api/spaces?spaceId=" + space.id, {
        method: "DELETE",
      });
      toast.success("space deleted successfully ");
      setOpenDeleteAlert(false);
        router.refresh();
    } catch (err) {
      console.log("error ", err);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="border w-66 h-44 rounded-lg ">
      <div className="flex flex-col  gap-4 cursor-pointer border-none bg-none p-4">
        <div className=" rounded-xl flex justify-between">
          <GiSoundWaves size={28} />
          <Button variant={"ghost"} onClick={() => setOpenDeleteAlert(true)}>
            <MdDelete className=" " size={28} />
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-bold">{space.name}</span>
          <span className="text-xs">{createdAt}</span>
        </div>
        <Button
          onClick={() => router.push("/spaces/" + space.id)}
          className="cursor-pointer text-xs"
          variant={"outline"}
        >
          JOIN
        </Button>
      </div>

      <AlertDialog open={openDeleteAlert}>
        {/* <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Chat</Button>
      </AlertDialogTrigger> */}
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
              <MdDelete />
            </AlertDialogMedia>
            <AlertDialogTitle>Delete Space?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this Space conversation and its
              Streams.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer"
              variant="outline"
              onClick={() => setOpenDeleteAlert(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDeleteSpace}
            >
              {isDeleting ? "Deleting" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SpaceCard;
