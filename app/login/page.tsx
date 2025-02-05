"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  const { login, checkAuthorizedDomain } = useAuth()
  const [isAuthorized, setIsAuthorized] = useState(true)

  useEffect(() => {
    checkAuthorizedDomain().then(setIsAuthorized)
  }, [checkAuthorizedDomain])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="w-full max-w-md space-y-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Unauthorized Domain</h1>
          <p className="text-gray-600">This domain is not authorized for sign-in. Please contact the administrator.</p>
        </div>
      </div>
    )
  }

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

