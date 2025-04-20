import { db } from "~/server/db";
import { exercises } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default function CreateExercise() {

  async function createExercise(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    await db.insert(exercises).values({ name, description, category});
    revalidatePath("/exercises");
    redirect("/exercises");
  }
  
  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">Create New Exercise</h1>
    <form action={createExercise}>
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
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          description
        </label>
        <textarea
          name="description"
          id="description"
          className="w-full p-2 border rounded"
          required
          rows={5}
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2">
          category
        </label>
        <input
          type="text"
          required
          name="category"
          id="category"
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create Exercise
      </button>
    </form>
  </div>
  );
}
