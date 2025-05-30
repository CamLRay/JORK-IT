import Link from "next/link";
export default function Coach() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <h1 className="text-xl font-extrabold tracking-tight text-[hsl(280,100%,70%)] sm:text-[5rem]">
          Coach Dashboard
        </h1>
        <Link href="coach/exerciselist">Exercise List</Link>
      </div>
    </main>
  );
}
