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
import { useRouter} from "next/navigation";

// const deleteExercise = async ( id:string) => {
//     "use server";
//     await db.delete(exercises).where(eq(exercises.exercise_id, id));
//     revalidatePath("/exercises");
//     redirect("/exercises");
//   };

export function DropDownExercise( { id, name, deleteExercise }: {id:string, name:string, deleteExercise:(id:string) => void}) {

  const router = useRouter();
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
            <DropdownMenuItem onClick={() => router.push(`/exercises/${id}/edit`)}>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/exercises/" + id)}>View Details</DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
      </DropdownMenu>
        <DialogContent className="bg-zinc-700 border-black" >
          <DialogHeader>
            <DialogTitle>Delete {name}?</DialogTitle>
            <DialogDescription className="text-white">
              Doing so will permanently remove it from the list.
            </DialogDescription>
            <Button className="drop-shadow-2xl" variant="destructive" onClick={()=>deleteExercise(id)}>Delete</Button>
            {/* add ability to programatically close dialogue on delete */}
          </DialogHeader>
        </DialogContent>
    </Dialog>    
  )
}