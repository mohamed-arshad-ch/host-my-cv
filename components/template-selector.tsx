import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface TemplateSelectorProps {
  onSelect: (templateId: string) => void
}

const templates = [
  { id: "template1", name: "Modern Clean" },
  { id: "template2", name: "Professional" },
  { id: "template3", name: "Creative" },
  { id: "template4", name: "Minimal" },
  { id: "template5", name: "Executive" },
  { id: "template6", name: "Contemporary" },
]

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {templates.map((template) => (
        <motion.div
          key={template.id}
          className="bg-white rounded-xl shadow-sm p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="aspect-[3/4] mb-4 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={`/placeholder.svg?height=400&width=300`}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={() => console.log("Preview:", template.id)}>
              Preview
            </Button>
            <Button className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={() => onSelect(template.id)}>
              Select
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

