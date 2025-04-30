import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { Button } from "~/components/ui/button";


export default async function ExercisePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  
  const [exercise] = await db
    .select()
    .from(exercises)
    .where(eq(exercises.exercise_id, params.id))
    .limit(1);

  return (
    <main className="flex flex-col min-h-screen items-center mt-5">
      <div className="flex justify-between items-baseline items-center gap-4">
        <h1 className="capitalize text-5xl text-center">{exercise?.name ?? "Not found"}</h1>
        <Button asChild variant="default">
        <Link href={`./${params.id}/edit`}>Edit</Link>
      </Button>
      </div>
      <div className="w-[70%] sm:w-[80%]">{exercise?.description}</div>
      
      { exercise?.embed ?
        <div className="relative aspect-16/9 w-[70%] sm:w-[50%]">
          <iframe className="absolute top-0 left-0 right-0 bottom-0 w-full h-full" tw="" src={exercise?.embed ?? ''} />
        </div>
        :
        null
      }
      <div className="capitalize"><span className="text-xl">Tags: </span>{exercise?.tags.join(", ")}</div>
    </main>
  );
}