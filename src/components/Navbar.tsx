import { Icon } from '@iconify/react'
import Link from 'next/link';
import { db } from '~/server/db';
import { auth } from '~/lib/auth';
import { headers } from "next/headers";
import { users} from '~/server/db/auth-schema';
import { eq } from "drizzle-orm";
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar';

export default async function Navbar() {
  const menu =[
    { name: "dashboard", path: '/', icon: ["material-symbols:dashboard-outline", "material-symbols:dashboard" ] }, 
    { name: "history", path: '/history', icon: ["material-symbols-light:book-outline", "material-symbols-light:book" ] }, 
    { name: "", path: '', icon: ["f7:plus-app-fill", "f7:plus-app-fill"] }, 
    { name: "exercises", path: '/exercises', icon: ["healthicons:exercise-outline", "healthicons:exercise"] },
  ]

  const session = await auth.api.getSession({ headers: await headers() });
  if (session) {
    const fetchUser = await db.select().from(users).where(eq(users.id, session?.user.id));
    const currentUser = fetchUser[0];
    const initial = currentUser?.name.split(" ")[0]?.charAt(0).toUpperCase()
  
    return(
      <nav className="fixed bottom-0 left-0 z-50 bg-zinc-900 text-stone-200 min-w-full border-t-1 border-t-zinc-400">
        <div className='grid grid-cols-5 gap-2 place-items-center'>
          {menu.map((option, index) => (
            <Link key={index} href={option.path} className="capitalize grid grid-rows-1 place-items-center py-2 text-xs" ><Icon icon={option.icon[1]!} className="text-3xl text-white"/>{option.name}</Link>
          ))}
          <Link href={`/about/${currentUser?.id}`}>
            <Avatar>
              <AvatarImage src={currentUser?.image ?? undefined} />
              <AvatarFallback className='bg-fuchsia-900'>{initial}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </nav>
    );
  }

  return(
    <nav className="fixed bottom-0 left-0 z-50 bg-zinc-900 text-stone-200 min-w-full border-t-1 border-t-zinc-400">
      <div className='grid grid-cols-5 gap-2 place-items-center'>
        {menu.map((option, index) => (
          <Link key={index} href={option.path} className="capitalize grid grid-rows-1 place-items-center py-2 text-xs" ><Icon icon={option.icon[1]!} className="text-3xl text-white"/>{option.name}</Link>
        ))}
        <Link href={"/signin"}>Sign In</Link>
      </div>
    </nav>
  );
}