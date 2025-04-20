
export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Welcome to<span className="text-[hsl(280,100%,70%)]">JORK IT</span>
        </h1>
        <ul className="grid grid-flow-col gap-4">
          <div className="flex bg-neutral-600/50 p-5 h-50 w-50 border-2 rounded text-center items-center">This is a workout place holder</div>
        </ul>
      </div>
    </main>
  );
}
