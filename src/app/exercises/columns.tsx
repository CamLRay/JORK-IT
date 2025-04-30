"use client"

import { type ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Exercise = {
  id: string
  name: string
  tags: Array<string>
  embed: string
}

export const columns: ColumnDef<Exercise>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "tags",
    header: "Tags",
  },
]
