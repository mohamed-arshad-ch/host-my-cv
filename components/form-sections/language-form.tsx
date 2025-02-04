"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"

interface Language {
  id: string
  name: string
  proficiency: string
}

const proficiencyLevels = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" },
]

const initialLanguage: Language = {
  id: "",
  name: "",
  proficiency: "",
}

export function LanguageForm() {
  const [languages, setLanguages] = useState<Language[]>([])
  const [currentLanguage, setCurrentLanguage] = useState<Language>(initialLanguage)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentLanguage((prev) => ({ ...prev, [name]: value }))
  }

  const handleProficiencyChange = (value: string) => {
    setCurrentLanguage((prev) => ({ ...prev, proficiency: value }))
  }

  const handleAdd = () => {
    if (currentLanguage.name && currentLanguage.proficiency) {
      setLanguages((prev) => [...prev, { ...currentLanguage, id: Date.now().toString() }])
      setCurrentLanguage(initialLanguage)
    }
  }

  const handleRemove = (id: string) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id))
  }

  const isFormValid = () => {
    return currentLanguage.name && currentLanguage.proficiency
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">Add Language</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Language Name</label>
            <Input
              name="name"
              value={currentLanguage.name}
              onChange={handleInputChange}
              placeholder="Enter language name"
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Proficiency Level</label>
            <Select value={currentLanguage.proficiency} onValueChange={handleProficiencyChange}>
              <SelectTrigger className="border-[#7C3AED] focus-visible:ring-[#7C3AED]">
                <SelectValue placeholder="Select proficiency level" />
              </SelectTrigger>
              <SelectContent>
                {proficiencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              Add Language
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {languages.map((language) => (
            <motion.div
              key={language.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-[#2D2B6B]">{language.name}</h3>
                      <p className="text-sm text-gray-600">
                        {proficiencyLevels.find((level) => level.value === language.proficiency)?.label}
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleRemove(language.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

