"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { TemplateCard } from "@/components/template-card"

const templates = [
  { id: "1", name: "Modern Minimal", image: "/placeholder.svg?height=400&width=300" },
  { id: "2", name: "Professional Classic", image: "/placeholder.svg?height=400&width=300" },
  { id: "3", name: "Creative Portfolio", image: "/placeholder.svg?height=400&width=300" },
  { id: "4", name: "Executive Suite", image: "/placeholder.svg?height=400&width=300" },
  { id: "5", name: "Tech Innovator", image: "/placeholder.svg?height=400&width=300" },
  { id: "6", name: "Startup Special", image: "/placeholder.svg?height=400&width=300" },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const handlePreview = (templateId: string) => {
    console.log("Preview template:", templateId)
    // Implement preview functionality
  }

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    router.push("/resume-editor")
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 ml-16 px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-[#2D2B6B] text-center mb-16">Let's Choose Your Resume Template</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TemplateCard
                  template={template}
                  isSelected={selectedTemplate === template.id}
                  onPreview={() => handlePreview(template.id)}
                  onSelect={() => handleSelect(template.id)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

