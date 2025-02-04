"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ViewProjectModal } from "@/components/modals/view-project-modal"

interface Project {
  id: string
  name: string
  role: string
  description: string
  technologies: string
  link: string
}

const initialProject: Project = {
  id: "",
  name: "",
  role: "",
  description: "",
  technologies: "",
  link: "",
}

export function ProjectsForm() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProject, setCurrentProject] = useState<Project>(initialProject)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingProject, setViewingProject] = useState<Project | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCurrentProject((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (editingId) {
      setProjects((prev) => prev.map((proj) => (proj.id === editingId ? { ...currentProject, id: editingId } : proj)))
      setEditingId(null)
    } else {
      setProjects((prev) => [...prev, { ...currentProject, id: Date.now().toString() }])
    }
    setCurrentProject(initialProject)
  }

  const handleEdit = (project: Project) => {
    setCurrentProject(project)
    setEditingId(project.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemove = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id))
  }

  const handleView = (project: Project) => {
    setViewingProject(project)
  }

  const isFormValid = () => {
    return currentProject.name && currentProject.role && currentProject.description
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">{editingId ? "Edit Project" : "Add Project"}</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Project Name</label>
            <Input
              name="name"
              value={currentProject.name}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Role in the Project</label>
            <Input
              name="role"
              value={currentProject.role}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Textarea
              name="description"
              value={currentProject.description}
              onChange={handleInputChange}
              className="min-h-[100px] border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Technologies Used</label>
            <Input
              name="technologies"
              value={currentProject.technologies}
              onChange={handleInputChange}
              placeholder="e.g., React, Node.js, TypeScript"
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">GitHub/Live Link</label>
            <Input
              name="link"
              value={currentProject.link}
              onChange={handleInputChange}
              placeholder="https://"
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setCurrentProject(initialProject)
                }}
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              {editingId ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2B6B]">{project.name}</h3>
                      <p className="text-gray-600">{project.role}</p>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleView(project)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(project.id)}
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

      <ViewProjectModal project={viewingProject} isOpen={!!viewingProject} onClose={() => setViewingProject(null)} />
    </div>
  )
}

