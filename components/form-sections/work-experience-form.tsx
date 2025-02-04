"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ViewExperienceModal } from "@/components/modals/view-experience-modal"

interface WorkExperience {
  id: string
  jobTitle: string
  companyName: string
  companyLocation: string
  skillsUsed: string
  startDate: string
  endDate: string
  responsibilities: string
}

const initialExperience: WorkExperience = {
  id: "",
  jobTitle: "",
  companyName: "",
  companyLocation: "",
  skillsUsed: "",
  startDate: "",
  endDate: "",
  responsibilities: "",
}

export function WorkExperienceForm() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([])
  const [currentExperience, setCurrentExperience] = useState<WorkExperience>(initialExperience)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingExperience, setViewingExperience] = useState<WorkExperience | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentExperience((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (editingId) {
      setExperiences((prev) =>
        prev.map((exp) => (exp.id === editingId ? { ...currentExperience, id: editingId } : exp)),
      )
      setEditingId(null)
    } else {
      setExperiences((prev) => [...prev, { ...currentExperience, id: Date.now().toString() }])
    }
    setCurrentExperience(initialExperience)
  }

  const handleEdit = (experience: WorkExperience) => {
    setCurrentExperience(experience)
    setEditingId(experience.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemove = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id))
  }

  const handleView = (experience: WorkExperience) => {
    setViewingExperience(experience)
  }

  const isFormValid = () => {
    return (
      currentExperience.jobTitle &&
      currentExperience.companyName &&
      currentExperience.startDate &&
      currentExperience.endDate
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">
          {editingId ? "Edit Work Experience" : "Add Work Experience"}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Job Title</label>
            <Input
              name="jobTitle"
              value={currentExperience.jobTitle}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <Input
              name="companyName"
              value={currentExperience.companyName}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Location</label>
            <Input
              name="companyLocation"
              value={currentExperience.companyLocation}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Skills Used</label>
            <Input
              name="skillsUsed"
              value={currentExperience.skillsUsed}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={currentExperience.startDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <Input
              type="date"
              name="endDate"
              value={currentExperience.endDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Job Responsibilities</label>
            <Textarea
              name="responsibilities"
              value={currentExperience.responsibilities}
              onChange={handleInputChange}
              className="min-h-[100px] border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setCurrentExperience(initialExperience)
                }}
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              {editingId ? "Update Experience" : "Add Experience"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {experiences.map((experience) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2B6B]">{experience.jobTitle}</h3>
                      <p className="text-gray-600">{experience.companyName}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(experience.startDate).toLocaleDateString()} -{" "}
                      {new Date(experience.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleView(experience)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleEdit(experience)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(experience.id)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ViewExperienceModal
        experience={viewingExperience}
        isOpen={!!viewingExperience}
        onClose={() => setViewingExperience(null)}
      />
    </div>
  )
}

