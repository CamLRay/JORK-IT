import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "~/components/ui/button";



export default async function ExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const route = await params;
  const id = route?.exerciseId;

  const [exercise] = await db
    .select()
    .from(exercises)
    .where(eq(exercises.exercise_id, id))
    .limit(1);

  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex justify-between items-baseline">
        <h1 className="capitalize text-5xl text-center">{exercise?.name ?? "Not found"}</h1>
        
      </div>
      <div className="w-[70%] sm:w-[80%]">{exercise?.description}</div>
      <div className="capitalize"><span className="text-xl">Tags: </span>{exercise?.tags.join(", ")}</div>
      <div className="relative aspect-16/9 w-[70%] sm:w-[80%]">
        <iframe className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" tw="" src={exercise?.embed ?? ''}/>
      </div>
      <Button asChild>
        <Link href={`./edit/${id}`}>Edit</Link>
      </Button>
    </main>
  );
}