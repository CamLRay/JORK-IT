import SignIn from "~/components/Sign-in";
export default function SingInPage() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <SignIn/>
      </div>
    </main>
  );
}
