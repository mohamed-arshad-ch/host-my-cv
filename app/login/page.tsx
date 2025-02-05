"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation"


export default function LoginPage() {
  const { user,login } = useAuth()
 

const router = useRouter()

useEffect(() => {
  if (!user) {
    router.push("/login")
  } else {
    router.push("/onboarding")
  }
}, [user,router])
 


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Sign In</h1>
        </div>
        <LoginForm onGoogleSignIn={login} />
      </div>
    </div>
  )
}

