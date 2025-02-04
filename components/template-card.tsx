import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface TemplateCardProps {
  template: {
    id: string
    name: string
    image: string
  }
  isSelected: boolean
  onPreview: () => void
  onSelect: () => void
}

export function TemplateCard({ template, isSelected, onPreview, onSelect }: TemplateCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative aspect-[3/4] w-full">
        <Image src={template.image || "/placeholder.svg"} alt={template.name} fill className="object-cover" />
      </div>
      <div className="p-4 space-y-4">
        <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button variant="default" className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9]" onClick={onSelect}>
            Select
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

