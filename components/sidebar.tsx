import Link from "next/link"
import { LayoutGrid, SlidersHorizontal, Clock, CreditCard, Settings } from "lucide-react"
import { Logo } from "@/components/logo"
import type React from "react" // Added import for React

export function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r flex flex-col items-center py-8">
      <Link href="/" className="mb-12">
        <Logo />
      </Link>
      <nav className="flex flex-col items-center space-y-8">
        <SidebarLink href="/dashboard" icon={LayoutGrid} />
        <SidebarLink href="/customize" icon={SlidersHorizontal} />
        <SidebarLink href="/history" icon={Clock} />
        <SidebarLink href="/billing" icon={CreditCard} />
        <SidebarLink href="/settings" icon={Settings} />
      </nav>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ElementType
}

function SidebarLink({ href, icon: Icon }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-[#7C3AED] transition-colors"
    >
      <Icon className="w-5 h-5" />
    </Link>
  )
}

