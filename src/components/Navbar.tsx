import { Icon } from '@iconify/react'
import Link from 'next/link';

export default function Navbar() {
  const menu =[
    { name: "dashboard", path: '/', icon: ["material-symbols:dashboard-outline", "material-symbols:dashboard" ] }, 
    { name: "history", path: '/history', icon: ["material-symbols-light:book-outline", "material-symbols-light:book" ] }, 
    { name: "", path: '', icon: ["f7:plus-app-fill", "f7:plus-app-fill"] }, 
    { name: "exercises", path: '/exercises', icon: ["healthicons:exercise-outline", "healthicons:exercise"] },
    { name: "more", path: '/more', icon: ["fluent:more-circle-32-regular", "fluent:more-circle-32-filled"] } 
  ]
  return(
    <nav className="fixed bottom-0 left-0 bg-zinc-900 text-stone-200 min-w-full grid grid-cols-5 gap-2 place-items-center border-t-1 border-t-zinc-400">
      {menu.map((option, index) => (
        <Link key={index} href={option.path} className="capitalize grid grid-rows-1 place-items-center py-2 text-xs" ><Icon icon={option.icon[1]!} className="text-3xl text-white"/>{option.name}</Link>
      ))}
    </nav>
  );
}