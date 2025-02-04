"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ViewAchievementModal } from "@/components/modals/view-achievement-modal"

interface Achievement {
  id: string
  name: string
  organization: string
  description: string
  year: string
}

const initialAchievement: Achievement = {
  id: "",
  name: "",
  organization: "",
  description: "",
  year: "",
}

export function AchievementsForm() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [currentAchievement, setCurrentAchievement] = useState<Achievement>(initialAchievement)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingAchievement, setViewingAchievement] = useState<Achievement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentAchievement((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (editingId) {
      setAchievements((prev) =>
        prev.map((achievement) =>
          achievement.id === editingId ? { ...currentAchievement, id: editingId } : achievement,
        ),
      )
      setEditingId(null)
    } else {
      setAchievements((prev) => [...prev, { ...currentAchievement, id: Date.now().toString() }])
    }
    setCurrentAchievement(initialAchievement)
  }

  const handleEdit = (achievement: Achievement) => {
    setCurrentAchievement(achievement)
    setEditingId(achievement.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemove = (id: string) => {
    setAchievements((prev) => prev.filter((achievement) => achievement.id !== id))
  }

  const handleView = (achievement: Achievement) => {
    setViewingAchievement(achievement)
  }

  const isFormValid = () => {
    return currentAchievement.name && currentAchievement.organization && currentAchievement.year
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">
          {editingId ? "Edit Achievement" : "Add Achievement"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Award Name</label>
            <Input
              name="name"
              value={currentAchievement.name}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
            <Input
              name="organization"
              value={currentAchievement.organization}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              name="description"
              value={currentAchievement.description}
              onChange={handleInputChange}
              className="min-h-[100px] border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Year of Achievement</label>
            <Input
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear()}
              value={currentAchievement.year}
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
                  setCurrentAchievement(initialAchievement)
                }}
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              {editingId ? "Update Achievement" : "Add"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2B6B]">{achievement.name}</h3>
                      <p className="text-gray-600">{achievement.organization}</p>
                    </div>
                    <div className="text-sm text-gray-500">Year: {achievement.year}</div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleView(achievement)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleEdit(achievement)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(achievement.id)}
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

      <ViewAchievementModal
        achievement={viewingAchievement}
        isOpen={!!viewingAchievement}
        onClose={() => setViewingAchievement(null)}
      />
    </div>
  )
}

