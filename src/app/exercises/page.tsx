import Link from "next/link"
export default function Exercises() {

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

  return(
    <main className="p-5 min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex justify-between items-baseline px-3">
        <h1 className=" text-5xl">Exercises</h1>
        <Link href="/exercises/new" className="px-3 rounded-4xl">Add +</Link>
      </div>
      <ul className="flex flex-col">
        {exerciseList.map((exercise, index)=>(
          <Link href={"/exercises/" + exercise.exercise_id} key={index} className="capitalize border-y">
            <p>{exercise.name} ({exercise.equipment})</p>
            <p className="text-sm text-zinc-300">{exercise.category}</p>
          </Link>
        ))}
      </ul>
    </main>
  )
}