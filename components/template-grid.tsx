"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Template {
  id: string
  name: string
  category: string
  thumbnail: string
}

const templates: Template[] = [
  { id: "1", name: "Modern Sleek", category: "Modern", thumbnail: "/placeholder.svg?height=400&width=300" },
  { id: "2", name: "Clean Minimal", category: "Minimalist", thumbnail: "/placeholder.svg?height=400&width=300" },
  { id: "3", name: "Creative Edge", category: "Creative", thumbnail: "/placeholder.svg?height=400&width=300" },
  { id: "4", name: "Professional Classic", category: "Modern", thumbnail: "/placeholder.svg?height=400&width=300" },
  { id: "5", name: "Subtle Elegance", category: "Minimalist", thumbnail: "/placeholder.svg?height=400&width=300" },
  { id: "6", name: "Bold Innovator", category: "Creative", thumbnail: "/placeholder.svg?height=400&width=300" },
]

interface TemplateGridProps {
  selectedCategory: string | null
}

export function TemplateGrid({ selectedCategory }: TemplateGridProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const filteredTemplates = selectedCategory
    ? templates.filter((template) => template.category === selectedCategory)
    : templates

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    // Here you would typically navigate to the resume editor or perform some other action
    console.log(`Selected template: ${templateId}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredTemplates.map((template) => (
        <motion.div
          key={template.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="relative h-64 md:h-80">
            <Image src={template.thumbnail || "/placeholder.svg"} alt={template.name} layout="fill" objectFit="cover" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{template.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{template.category}</p>
            <Button
              onClick={() => handleSelectTemplate(template.id)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white"
            >
              Select Template
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

