"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { DataTableRowActions } from "./DataTableRowActions"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
// import { DropDownExercise } from "~/components/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Exercise = {
  exercise_id: string
  name: string
  tags: string[]
  description: string | null
  embed: string | null
}

export const columns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-zinc-400"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "description",
    header: () => <div className=" text-zinc-400 font-bold">Description</div>,
  },
  {
    accessorKey: "tags",
    header: () => <div className=" text-zinc-400 font-bold">Tags</div>,
    cell: ({ row }) => {
      const tags: string[] = row.getValue("tags")
      return (
        <div className="grid grid-cols-4 w-3/4">
          {tags.map(tag => (
            <Badge className="bg-fuchsia-800/50" key={tag}>{tag}</Badge>
          ))}
        </div>
      )
    },

    filterFn: (row, columnId, filterValue: string) => {
      const rowTags: string[] = row.getValue(columnId)
      if (!filterValue) return true

      return rowTags.some(tag =>
    tag.toLowerCase().includes(filterValue.toLowerCase())
  )
    },
    enableColumnFilter: true,
  },
  // {
  //   accessorKey: "action",
  //   header: () => <Link href={`/exercises/new`} className="text-white justify-end font-bold p-2 rounded-md hover:bg-white hover:text-black">Add New</Link>,
  //   cell: ({ row }) => <DataTableRowActions row={row} />
  // },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  },
]
