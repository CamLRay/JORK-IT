import { db } from "~/server/db/";
import { exercises } from "~/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { handleVideoLink } from "~/lib/actions";

export default function CreateExercise() {

  async function createExercise(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const rawTags = formData.get("tags");
    const tags = typeof rawTags === "string" ? rawTags.split(",").map(tag => tag.trim()).filter(Boolean) : [];
    const youtubeLink = formData.get("embed") as string;
    const embed = await handleVideoLink(youtubeLink);

    await db.insert(exercises).values({ name, description, tags, embed});
    revalidatePath("/exercises");
    redirect("/exercises");
  }
  
  return (
    <main className="flex items-center justify-center min-h-[75vh]">
      <Card className="w-3/4 bg-black/20 dark">
      <CardHeader className="text-center">
        <CardTitle>New Exercise</CardTitle>
        <CardDescription>Fill out new exercise details.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createExercise}>
          <div className="mb-4">
            <Label htmlFor="name" className="block mb-2">
              Exercise Name
            </Label>
            <Input
              type="text"
              required
              name="name"
              id="name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="description" className="block mb-2">
              Description
            </Label>
            <Textarea
              name="description"
              id="description"
              className="w-full  p-2 border rounded"
              rows={5}
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="tags" className="block mb-2">
              Tags comma seperated ie {`(push, pull)`}
            </Label>
            <Input
              type="text"
              name="tags"
              id="tags"
              className="w-full p-2 border rounded"
              placeholder="ie. push/pull, chest"
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
                placeholder="https://www.youtube.com/watch?v=1LsIQr_4iSY"
              />
            </div>
            <div className="flex justify-between">
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Create Exercise
            </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
);
};
  //   <div className="flex justify-center mt-4">
  //   <div className="w-3/4">
  //   <h1 className="text-2xl font-bold mb-4">Create New Exercise</h1>
    
  //   <form action={createExercise}>
  //     <div className="mb-4">
  //       <Label htmlFor="name" className="block mb-2">
  //         Name
  //       </Label>
  //       <Input
  //         type="text"
  //         required
  //         name="name"
  //         id="name"
  //         className="w-full p-2 border rounded"
  //       />
  //     </div>
  //     <div className="mb-4">
  //       <Label htmlFor="description" className="block mb-2">
  //         Description
  //       </Label>
  //       <Textarea
  //         name="description"
  //         id="description"
  //         className="w-full  p-2 border rounded"
  //         required
  //         rows={5}
  //       ></Textarea>
  //     </div>
  //     <div className="mb-4">
  //       <Label htmlFor="tags" className="block mb-2">
  //         Tags
  //       </Label>
  //       <Input
  //         type="text"
  //         required
  //         name="tags"
  //         id="tags"
  //         className="w-full p-2 border rounded"
  //       />
  //     </div>
  //     <div className="mb-4">
  //       <Label htmlFor="embed" className="block mb-2">
  //         Video Embed Link
  //       </Label>
  //       <Input
  //         type="text"
  //         name="embed"
  //         id="embed"
  //         className="w-full p-2 border rounded"
  //       />
  //     </div>
  //     <button
  //       type="submit"
  //       className="bg-blue-500 text-white px-4 py-2 rounded"
  //     >
  //       Create Exercise
  //     </button>
  //   </form>
  // </div>
  // </div>
  // );
// }
