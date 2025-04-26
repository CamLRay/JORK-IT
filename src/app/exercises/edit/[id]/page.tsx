import { Button } from "~/components/ui/button"

import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function EditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const exercise = await db.select().from(exercises).where(eq(exercises.exercise_id, params.id)).then((res) => res[0]);

  if (!exercise) {
    return <div>Post not found</div>;
  }

  const deleteExercise = async () => {
    "use server";
    await db.delete(exercises).where(eq(exercises.exercise_id, exercise.exercise_id));
    revalidatePath("/exercises");
    redirect("/exercises");
  };

  const updateExercise = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const rawTags = formData.get("tags") as string;
    const embed = formData.get("embed") as string;

    const tags = typeof rawTags === "string" ? rawTags.split(",").map(tag => tag.trim()).filter(Boolean) : [];

    await db.update(exercises).set({name, description, embed, tags}).where(eq(exercises.exercise_id, params.id));
    revalidatePath("/exercises");
    redirect(`/exercises/${params.id}`)
  }
return (
  <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    <div>
    <h1 className="text-2xl font-bold mb-4">Edit {exercise.name}</h1>
    <form action={updateExercise}>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          required
          name="name"
          id="name"
          className="w-full p-2 border rounded"
          defaultValue={exercise?.name ?? ""}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="w-full p-2 border rounded"
          required
          rows={5}
          defaultValue={exercise?.description ?? ""}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block mb-2">
          Tags comma seperated ie {`(push, pull)`}
        </label>
        <input
          type="text"
          required
          name="tags"
          id="tags"
          className="w-full p-2 border rounded"
          defaultValue={exercise?.tags.join(", ") ?? ""}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="embed" className="block mb-2">
          Video Embed Link
        </label>
        <input
          type="text"
          required
          name="embed"
          id="embed"
          className="w-full p-2 border rounded"
          defaultValue={exercise?.embed ?? ""}
        />
      </div>
      <Button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update Exercise
      </Button>
    </form>
  </div>
    <Button variant="destructive" onClick={deleteExercise}>Delete</Button>
  </main>
);
};
