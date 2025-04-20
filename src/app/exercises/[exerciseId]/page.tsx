import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export default async function ExercisePage({ params }: { params: Promise<{ exerciseId: string }> }) {
  const route = await params;
  const id = parseInt(route?.exerciseId);

  const [exercise] = await db
    .select()
    .from(exercises)
    .where(eq(exercises.exercise_id, id))
    .limit(1);

  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex justify-between">
        <h1 className="capitalize text-5xl">{exercise?.name ?? "Not found"}</h1>
        <Link href={`./${id}/edit`}>Edit</Link>
      </div>
      <div>{exercise?.description}</div>
    </main>
  );
}