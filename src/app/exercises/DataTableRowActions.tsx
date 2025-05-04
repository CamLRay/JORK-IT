"use client"
import { type Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { deleteExercise } from "~/lib/actions";
import type { Exercise } from "./columns";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { useState } from "react";




interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export const DataTableRowActions = <TData,>({ row }: DataTableRowActionsProps<TData>) => {

  const router = useRouter();
  const exercise = ( row.original as Exercise)

  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
      await deleteExercise({ id: exercise.exercise_id })
      setOpen(false)
  }

  return (
    <>
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Button variant="destructive" onClick={handleDelete}>Delete</Button>
      </DialogContent>
    </Dialog>

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => router.push(`exercises/${exercise.exercise_id}`)}>View Details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(`exercises/${exercise.exercise_id}/edit`)}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
          <DropdownMenuItem 
            variant="destructive"
            onClick={() => setOpen(true)}
          >
            Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  )
}