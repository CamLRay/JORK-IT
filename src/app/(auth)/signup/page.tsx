import SignUp from "~/components/Sign-up";
export default function SignUpPage() {
  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <SignUp/>
      </div>
    </main>
  );
}
