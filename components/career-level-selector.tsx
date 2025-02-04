import { motion } from "framer-motion"
import { FaGraduationCap, FaBriefcase, FaLaptop } from "react-icons/fa"

interface CareerLevelSelectorProps {
  selectedLevel: string | null
  onSelect: (level: string) => void
}

const careerLevels = [
  { id: "student", label: "Student", icon: FaGraduationCap },
  { id: "professional", label: "Experienced Professional", icon: FaBriefcase },
  { id: "freelancer", label: "Freelancer", icon: FaLaptop },
]

export function CareerLevelSelector({ selectedLevel, onSelect }: CareerLevelSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {careerLevels.map((level) => (
        <motion.button
          key={level.id}
          onClick={() => onSelect(level.id)}
          className={`p-6 rounded-lg border-2 flex flex-col items-center justify-center transition duration-300 ease-in-out ${
            selectedLevel === level.id
              ? "border-primary-600 bg-primary-50"
              : "border-gray-200 hover:border-primary-300 hover:bg-gray-50"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <level.icon className="text-4xl mb-4 text-primary-600" />
          <span className="text-lg font-medium text-gray-800">{level.label}</span>
        </motion.button>
      ))}
    </div>
  )
}

