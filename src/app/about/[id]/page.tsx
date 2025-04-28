"use client"
import { Button } from "~/components/ui/button";
import { signOut } from "~/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserPage() {
  
  const router = useRouter()

  return (
    <main className="flex flex-col min-h-screen items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-col items-center gap-4 px-4 py-4">
        <Button onClick={async () => {await signOut({
  fetchOptions: {
    onSuccess: () => {
      router.push("/signin")
      router.refresh()
    },
  },
})}}>Sign Out</Button>
      </div>
    </main>
  );
}
