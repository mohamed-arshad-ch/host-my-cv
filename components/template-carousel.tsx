import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

interface TemplateCarouselProps {
  selectedTemplate: string | null
  onSelect: (template: string) => void
}

const templates = [
  { id: "modern", name: "Modern", image: "/placeholder.svg?height=300&width=200" },
  { id: "classic", name: "Classic", image: "/placeholder.svg?height=300&width=200" },
  { id: "creative", name: "Creative", image: "/placeholder.svg?height=300&width=200" },
  { id: "professional", name: "Professional", image: "/placeholder.svg?height=300&width=200" },
]

export function TemplateCarousel({ selectedTemplate, onSelect }: TemplateCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedTemplateState, setSelectedTemplate] = useState<string | null>(null)

  const nextTemplate = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % templates.length)
  }

  const prevTemplate = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + templates.length) % templates.length)
  }

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    onSelect(templateId)
  }

  return (
    <div className="relative">
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={prevTemplate}
          className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-300"
        >
          <FaChevronLeft />
        </button>
        <div className="relative w-64 h-96">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              className={`absolute top-0 left-0 w-full h-full ${index === currentIndex ? "z-10" : "z-0"}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: index === currentIndex ? 1 : 0,
                scale: index === currentIndex ? 1 : 0.8,
              }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-md"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white text-xl font-semibold">{template.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={nextTemplate}
          className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition duration-300"
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={() => handleSelectTemplate(templates[currentIndex].id)}
          className={`px-4 py-2 rounded-full ${
            selectedTemplate === templates[currentIndex].id
              ? "bg-primary-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          } transition duration-300`}
        >
          {selectedTemplate === templates[currentIndex].id ? "Selected" : "Select This Template"}
        </button>
      </div>
    </div>
  )
}

