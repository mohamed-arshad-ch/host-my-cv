"use client"

import { motion } from "framer-motion"
import { GraduationCap, Briefcase, Bird } from "lucide-react"

interface UserTypeCardProps {
  id: string
  title: string
  description: string
  icon: string
  isSelected: boolean
  onSelect: () => void
}

const icons = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  bird: Bird,
}

export function UserTypeCard({ id, title, description, icon, isSelected, onSelect }: UserTypeCardProps) {
  const Icon = icons[icon as keyof typeof icons]

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`w-full text-left p-6 bg-white rounded-xl shadow-sm border-2 transition-colors ${
        isSelected ? "border-[#7C3AED]" : "border-transparent hover:border-[#7C3AED]"
      }`}
    >
      <div className="flex items-start gap-6">
        <div className="flex-shrink-0 w-12 h-12 bg-[#7C3AED]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#7C3AED]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </motion.button>
  )
}

