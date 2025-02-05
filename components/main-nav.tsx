"use client"

import type * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter()

  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold">Host My CV</span>
        </Link>
        <nav className={cn("flex items-center space-x-6 text-sm", className)} {...props}>
          <Link href="#features" className="text-foreground/60 transition-colors hover:text-foreground">
            Features
          </Link>
          <Link href="#templates" className="text-foreground/60 transition-colors hover:text-foreground">
            Templates
          </Link>
          <Link href="#pricing" className="text-foreground/60 transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link href="#about" className="text-foreground/60 transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.push("/login")}>
            Log in
          </Button>
          <Button onClick={() => router.push("/login")}>Get Started</Button>
        </div>
      </div>
    </div>
  )
}

