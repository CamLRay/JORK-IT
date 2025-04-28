import Link from "next/link"
import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { desc, eq } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { Badge } from "~/components/ui/badge";
import { DropDownExercise } from "~/components/dropdown-menu";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

  const deleteExercise = async (id:string) => {
    "use server";
    await db.delete(exercises).where(eq(exercises.exercise_id, id));
    revalidatePath("/exercises");
    redirect("/exercises");
  };

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default async function Exercises() {

  const allExercises = await db.select().from(exercises).orderBy(desc(exercises.name));


  return(
    <main className="p-5 min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    
      <Table>
        <TableCaption>A list of all exercises.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-white">Exercise</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Tags</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        {allExercises.map((exercise, index)=>(
          <TableRow key={index}>
            <TableCell className="font-medium capitalize">{exercise.name}</TableCell>
            <TableCell className="font-medium truncate sm:max-w-2xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl">{exercise.description}</TableCell>
            <TableCell className="font-medium capitalize">
              {exercise.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-zinc-500 border-zinc-800 text-white">
                  {tag}
                </Badge>
              ))}
              </TableCell>
            <TableCell className="text-right">
            <DropDownExercise id={exercise.exercise_id} name={exercise.name!} deleteExercise={deleteExercise} />
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </main>
  )
}