"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { UserTypeCard } from "@/components/user-type-card"

export default function OnboardingPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const userTypes = [
    {
      id: "student",
      title: "Student",
      description: "Build a standout resume to land internships and jobs.",
      icon: "graduation",
    },
    {
      id: "professional",
      title: "Professional",
      description: "Showcase expertise with a polished, modern resume.",
      icon: "briefcase",
    },
    {
      id: "freelancer",
      title: "Freelancer",
      description: "Create a compelling resume to attract more clients.",
      icon: "bird",
    },
  ]

  const handleSelectType = (typeId: string) => {
    setSelectedType(typeId)
    router.push("/onboarding/templates")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-16 px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#2D2B6B] text-center mb-16">Let's Personalize Your Experience</h1>
          <div className="space-y-4">
            {userTypes.map((type) => (
              <UserTypeCard
                key={type.id}
                {...type}
                isSelected={selectedType === type.id}
                onSelect={() => handleSelectType(type.id)}
              />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

