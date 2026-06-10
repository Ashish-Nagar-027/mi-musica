"use client";

import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CreateSpaceCard = () => {
  const [spaceName, setSpaceName] = useState("");
  const [isCreatingSpace, setIsCreatingSpace] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter()
  

  const createSpace = async () => {
    try {
      if (!spaceName) {
        toast.error("please Enter Space Name");
        return;
      }
      setIsCreatingSpace(true)
      setOpen(true)

      const res = await fetch(`/api/spaces`, {
        method: "POST",
        body: JSON.stringify({
          name: spaceName,
        }),
      });

      const data = await res.json();
   
      setIsCreatingSpace(false)
      toast.success(data.message);
      router.refresh();
setOpen(false)
    } catch (error) {
      toast.error("Something Went Wrong");
            setIsCreatingSpace(false)
            setOpen(false)
    }
  };

  return (
    <div className="border w-66 h-44 rounded-lg grid place-items-center">
      <div className="flex flex-col items-center gap-1 cursor-pointer border-none bg-none">
        {/* <span>Create New Space</span> */}
        <Dialog  open={open} onOpenChange={setOpen}>
          <form onSubmit={createSpace}>
            <DialogTrigger asChild>
              <Button className="p-0 m-0 h-auto w-auto bg-transparent hover:bg-transparent border-0 shadow-none flex flex-col-reverse text-white">
                <span>Add New Space</span>
                <CiCirclePlus
                  style={{
                    width: "28px",
                    height: "28px",
                  }}
                />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Create New Space</DialogTitle>
                {/* <DialogDescription>Enter Name For  Space</DialogDescription> */}
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name-1">Name</Label>
                  <Input
                    value={spaceName}
                    id="name-1"
                    name="name"
                    placeholder="Enter space Name"
                    onChange={(e) => setSpaceName(e.target.value)}
                  />
                </Field>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button disabled={isCreatingSpace} type="submit" onClick={createSpace}>
{       isCreatingSpace ? "Saving..."      :     "Save changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
};

export default CreateSpaceCard;
