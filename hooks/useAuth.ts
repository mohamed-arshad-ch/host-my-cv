import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"

import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(  (user) => {

      
      if (user) {
        setUser(user)
      } else {
        router.push("/login")
      }
    })

   

    return () => unsubscribe()
  }, [user,router])

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err: any) {
      console.error(err)
      if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for authentication. Please check your Firebase configuration.')
      } else {
        setError('Failed to sign in. Please try again.')
      }
    } finally {
      setLoading(false)
      router.push("/onboarding")
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out", error)
    }
  }

  const checkAuthorizedDomain = async () => {
    try {
    
      return true
    } catch (error) {
      console.error("Domain not authorized:", error)
      return false
    }
  }

  return { user, login, logout, checkAuthorizedDomain }
}

