import { Button } from "~/components/ui/button"

import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";


export default async function EditPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const exercise = await db.select().from(exercises).where(eq(exercises.exercise_id, params.id)).then((res) => res[0]);

  if (!exercise) {
    return <div>Exercise not found</div>;
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
    const youtubeLink = formData.get("embed") as string;
    const embed = youtubeLink.replace("watch?v=", "embed/");

    const tags = typeof rawTags === "string" ? rawTags.split(",").map(tag => tag.trim()).filter(Boolean) : [];

    await db.update(exercises).set({name, description, embed, tags}).where(eq(exercises.exercise_id, params.id));
    revalidatePath("/exercises");
    redirect(`/exercises/${params.id}`)
  }
return (
<main className="flex items-center justify-center text-center min-h-[75vh]">
  <Card className="w-[50%] dark bg-gradient-to-b to-[#2e026d] from-[#15162c]">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
  <form action={updateExercise}>
      <div className="mb-4">
        <Label htmlFor="name">
          Name
        </Label>
        <Input
          type="text"
          required
          name="name"
          id="name"
          className="w-full p-2 border rounded"
          defaultValue={exercise?.name ?? ""}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="description" className="block mb-2">
          Description
        </Label>
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
        <Label htmlFor="tags" className="block mb-2">
          Tags comma seperated ie {`(push, pull)`}
        </Label>
        <Input
          type="text"
          required
          name="tags"
          id="tags"
          className="w-full p-2 border rounded"
          defaultValue={exercise?.tags.join(", ") ?? ""}
        />
      </div>
      <div className="mb-4">
        <Label htmlFor="embed" className="block mb-2">
          Youtube Video Link
        </Label>
        <Input
          type="text"
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
    <Button variant="destructive" onClick={deleteExercise}>Delete</Button>
    </form>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
</main>
);
};
