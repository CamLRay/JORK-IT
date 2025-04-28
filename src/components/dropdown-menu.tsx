"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}  from "~/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { redirect } from "next/navigation";

// const deleteExercise = async ( id:string) => {
//     "use server";
//     await db.delete(exercises).where(eq(exercises.exercise_id, id));
//     revalidatePath("/exercises");
//     redirect("/exercises");
//   };

export function DropDownExercise( { id, name, deleteExercise }: {id:string, name:string, deleteExercise:(id:string) => void}) {

  
  return(
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-violet-950 text-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => redirect(`/exercises/${id}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => redirect("/exercises/" + id)}>View Details</DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
      </DropdownMenu>
        <DialogContent className="bg-zinc-500 border-2 border-destructive" >
          <DialogHeader>
            <DialogTitle className="text-destructive">Delete {name}?</DialogTitle>
            <DialogDescription className="text-white">
              Doing so will permanently remove it from the list.
            </DialogDescription>
            <Button variant="destructive" onClick={()=>deleteExercise(id)}>Delete</Button>
          </DialogHeader>
        </DialogContent>
    </Dialog>    
  )
}