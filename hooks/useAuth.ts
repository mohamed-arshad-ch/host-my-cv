import { useState, useEffect } from "react"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid))
        if (!userDoc.exists()) {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            name: user.displayName,
          })
        }
        setUser(user)
      } else {
        setUser(null)
      }
    })

    checkAuthorizedDomain().then((isAuthorized) => {
      if (!isAuthorized) {
        alert("This domain is not authorized for sign-in. Please contact the administrator.")
      }
    })

    return () => unsubscribe()
  }, [])

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      router.push("/resume-editor")
    } catch (error: any) {
      console.error("Error signing in with Google", error)
      if (error.code === "auth/unauthorized-domain") {
        alert("This domain is not authorized for sign-in. Please contact the administrator.")
      } else {
        alert("An error occurred during sign-in. Please try again.")
      }
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
      await fetch(`https://${auth.app.options.authDomain}/__/auth/iframe`)
      return true
    } catch (error) {
      console.error("Domain not authorized:", error)
      return false
    }
  }

  return { user, login, logout, checkAuthorizedDomain }
}

