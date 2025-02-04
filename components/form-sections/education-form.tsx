"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ViewEducationModal } from "@/components/modals/view-education-modal"

interface Education {
  id: string
  schoolName: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  description: string
}

const initialEducation: Education = {
  id: "",
  schoolName: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  description: "",
}

export function EducationForm() {
  const [educations, setEducations] = useState<Education[]>([])
  const [currentEducation, setCurrentEducation] = useState<Education>(initialEducation)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingEducation, setViewingEducation] = useState<Education | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentEducation((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (editingId) {
      setEducations((prev) => prev.map((edu) => (edu.id === editingId ? { ...currentEducation, id: editingId } : edu)))
      setEditingId(null)
    } else {
      setEducations((prev) => [...prev, { ...currentEducation, id: Date.now().toString() }])
    }
    setCurrentEducation(initialEducation)
  }

  const handleEdit = (education: Education) => {
    setCurrentEducation(education)
    setEditingId(education.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemove = (id: string) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id))
  }

  const handleView = (education: Education) => {
    setViewingEducation(education)
  }

  const isFormValid = () => {
    return (
      currentEducation.schoolName && currentEducation.degree && currentEducation.startDate && currentEducation.endDate
    )
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">{editingId ? "Edit Education" : "Add Education"}</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">School Name</label>
            <Input
              name="schoolName"
              value={currentEducation.schoolName}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Degree</label>
            <Input
              name="degree"
              value={currentEducation.degree}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Field of Study</label>
            <Input
              name="fieldOfStudy"
              value={currentEducation.fieldOfStudy}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={currentEducation.startDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <Input
              type="date"
              name="endDate"
              value={currentEducation.endDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              name="description"
              value={currentEducation.description}
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
                  setCurrentEducation(initialEducation)
                }}
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              {editingId ? "Update Education" : "Add Education"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {educations.map((education) => (
            <motion.div
              key={education.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2B6B]">{education.schoolName}</h3>
                      <p className="text-gray-600">{education.degree}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(education.startDate).toLocaleDateString()} -{" "}
                      {new Date(education.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleView(education)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleEdit(education)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(education.id)}
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

      <ViewEducationModal
        education={viewingEducation}
        isOpen={!!viewingEducation}
        onClose={() => setViewingEducation(null)}
      />
    </div>
  )
}

