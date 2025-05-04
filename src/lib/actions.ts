"use server"

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function deleteExercise(input: { id: string}) {
  await db.delete(exercises).where(eq(exercises.exercise_id, input.id));
  revalidatePath("/exercises");
  redirect("/exercises");
}

export async function handleVideoLink(url: string) {
  if (url.includes("watch?v=")) {
    return url.replace("watch?v=", "embed/")
  }
  if (url.includes("shorts/")) {
    return url.replace("shorts/", "embed/")
  }
}

