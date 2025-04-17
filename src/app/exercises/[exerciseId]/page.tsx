// import { useParams } from "next/navigation"
export default async function Exercise({ params} : { params: Promise<{ exerciseId: string}> }) {
// const params = useParams<{exercise: string}>();
  // const slug = await params;
  const route = await params;
  const exerciseList = [
    {
    exercise_id:"q1w2e3r4t5y6",
    name:"deadlift",
    category:"back",
    equipment:"barbell",
    },
    {
    exercise_id:"1q2w3e4r5t6y",
    name:"squat",
    category:"ass",
    equipment:"barbell",
    },
    {
    exercise_id:"123456qwerty",
    name:"bench press",
    category:"chest",
    equipment:"barbell",
    },
]

  const found = exerciseList.find((exerciseList)=> exerciseList.exercise_id === route?.exerciseId )
  console.log(route?.exerciseId);
  return(
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="capitalize">{(found?.name)}</h1>
    </main>
  )
}