"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ViewInternshipModal } from "@/components/modals/view-internship-modal"

interface Internship {
  id: string
  title: string
  company: string
  responsibilities: string
  startDate: string
  endDate: string
}

const initialInternship: Internship = {
  id: "",
  title: "",
  company: "",
  responsibilities: "",
  startDate: "",
  endDate: "",
}

export function InternshipsForm() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [currentInternship, setCurrentInternship] = useState<Internship>(initialInternship)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingInternship, setViewingInternship] = useState<Internship | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentInternship((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (editingId) {
      setInternships((prev) =>
        prev.map((intern) => (intern.id === editingId ? { ...currentInternship, id: editingId } : intern)),
      )
      setEditingId(null)
    } else {
      setInternships((prev) => [...prev, { ...currentInternship, id: Date.now().toString() }])
    }
    setCurrentInternship(initialInternship)
  }

  const handleEdit = (internship: Internship) => {
    setCurrentInternship(internship)
    setEditingId(internship.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemove = (id: string) => {
    setInternships((prev) => prev.filter((intern) => intern.id !== id))
  }

  const handleView = (internship: Internship) => {
    setViewingInternship(internship)
  }

  const isFormValid = () => {
    return currentInternship.title && currentInternship.company && currentInternship.startDate
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">
          {editingId ? "Edit Internship" : "Add Internship"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Internship Title</label>
            <Input
              name="title"
              value={currentInternship.title}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <Input
              name="company"
              value={currentInternship.company}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Responsibilities</label>
            <Textarea
              name="responsibilities"
              value={currentInternship.responsibilities}
              onChange={handleInputChange}
              className="min-h-[100px] border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Date</label>
            <Input
              type="date"
              name="startDate"
              value={currentInternship.startDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Date</label>
            <Input
              type="date"
              name="endDate"
              value={currentInternship.endDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setCurrentInternship(initialInternship)
                }}
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              {editingId ? "Update Internship" : "Add"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {internships.map((internship) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2B6B]">{internship.title}</h3>
                      <p className="text-gray-600">{internship.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(internship.startDate).toLocaleDateString()} -{" "}
                      {new Date(internship.endDate).toLocaleDateString()}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleView(internship)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleEdit(internship)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(internship.id)}
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

      <ViewInternshipModal
        internship={viewingInternship}
        isOpen={!!viewingInternship}
        onClose={() => setViewingInternship(null)}
      />
    </div>
  )
}

