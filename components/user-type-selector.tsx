import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Bird } from "lucide-react"

interface UserTypeSelectorProps {
  onSelect: (type: string) => void
}

const userTypes = [
  {
    id: "student",
    title: "Student",
    description: "Build a standout resume to land internships and jobs.",
    icon: GraduationCap,
    color: "violet",
  },
  {
    id: "professional",
    title: "Professional",
    description: "Showcase expertise with a polished, modern resume.",
    icon: Briefcase,
    color: "violet",
  },
  {
    id: "freelancer",
    title: "Freelancer",
    description: "Create a compelling resume to attract more clients.",
    icon: Bird,
    color: "violet",
  },
]

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  return (
    <div className="max-w-3xl mx-auto grid gap-6">
      {userTypes.map((type) => (
        <motion.button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className="flex items-center p-6 bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-violet-600 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex-shrink-0 w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center mr-6">
            <type.icon className="w-6 h-6 text-violet-600" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-semibold text-gray-900">{type.title}</h3>
            <p className="text-gray-600">{type.description}</p>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

