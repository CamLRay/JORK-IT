import Link from "next/link"
import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { asc } from "drizzle-orm";
import { DataTable } from "./data-table";
import { columns } from "./columns"

export default async function Exercises() {

  const allExercises = await db.select().from(exercises).orderBy(asc(exercises.name));

  return(
    
      <div className="container mx-auto py-10 w-screen">
        <div className="flex w-full items-end justify-end">
          <Link href={"/exercises/new"}>Add New Exercise</Link>
        </div>
        <DataTable columns={columns} data={allExercises}/>
      </div>
  )
}