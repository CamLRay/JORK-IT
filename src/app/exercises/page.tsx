import Link from "next/link"
import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { desc } from "drizzle-orm";
export default async function Exercises() {

  const allExercises = await db.select().from(exercises).orderBy(desc(exercises.name));

  return(
    <main className="p-5 min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex justify-between items-baseline px-3">
        <h1 className=" text-5xl">Exercises</h1>
        <Link href="/exercises/new" className="px-3 rounded-4xl">Add +</Link>
      </div>
      <ul className="flex flex-col">
        {allExercises.map((exercise, index)=>(
          <Link href={"/exercises/" + exercise.exercise_id} key={index} className="capitalize border-y">
            <p>{exercise.name}</p>
            <p className="text-sm text-zinc-300">{exercise.tags.join(", ")}</p>
          </Link>
        ))}
      </ul>
    </main>
  )
}