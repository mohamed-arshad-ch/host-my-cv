"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"

interface Resume {
  id: string
  personalInfo: {
    fullName: string
    jobTitle: string
  }
}

export default function ResumeListPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    } else {
      fetchResumes()
    }
  }, [user, router])

  const fetchResumes = async () => {
    if (user) {
      const q = query(collection(db, "resumes"), where("userId", "==", user.uid))
      const querySnapshot = await getDocs(q)
      const fetchedResumes: Resume[] = []
      querySnapshot.forEach((doc) => {
        fetchedResumes.push({ id: doc.id, ...doc.data() } as Resume)
      })
      setResumes(fetchedResumes)
    }
  }

  const handleEditResume = (id: string) => {
    router.push(`/resume-editor/${id}`)
  }

  const handleCreateNewResume = () => {
    router.push("/resume-editor")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2D2B6B]">Your Resumes</h1>
          <div className="flex gap-4">
            <Button onClick={handleCreateNewResume} className="bg-[#7C3AED] hover:bg-[#6D28D9]">
              Create New Resume
            </Button>
            <Button onClick={logout} variant="outline" className="border-red-500 text-red-500 hover:bg-red-50">
              Logout
            </Button>
          </div>
        </div>
        <div className="grid gap-6">
          {resumes.map((resume) => (
            <div key={resume.id} className="bg-white p-6 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{resume.personalInfo.fullName}</h2>
                <p className="text-gray-600">{resume.personalInfo.jobTitle}</p>
              </div>
              <Button
                onClick={() => handleEditResume(resume.id)}
                variant="outline"
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Edit
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

