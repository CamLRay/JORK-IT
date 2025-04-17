
export default function HomePage() {
  const items = ['workouts', 'Stats', 'widget 3']
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Welcome to<span className="text-[hsl(280,100%,70%)]">JORK IT</span>
        </h1>
        <ul className="grid grid-flow-col grid-rows-1 gap-4">
          {items.map((item, index) => (
            <li className="bg-gradient-to-b from-[#2e026d] to-[#15162c] p-5 border border-amber-50 " key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
