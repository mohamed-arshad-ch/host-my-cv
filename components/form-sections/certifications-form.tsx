"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, Pencil, Trash2 } from "lucide-react"
import { ViewCertificationModal } from "@/components/modals/view-certification-modal"

interface Certification {
  id: string
  name: string
  issuingOrganization: string
  issueDate: string
  expirationDate: string
}

const initialCertification: Certification = {
  id: "",
  name: "",
  issuingOrganization: "",
  issueDate: "",
  expirationDate: "",
}

export function CertificationsForm() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [currentCertification, setCurrentCertification] = useState<Certification>(initialCertification)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [viewingCertification, setViewingCertification] = useState<Certification | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCurrentCertification((prev) => ({ ...prev, [name]: value }))
  }

  const handleAdd = () => {
    if (editingId) {
      setCertifications((prev) =>
        prev.map((cert) => (cert.id === editingId ? { ...currentCertification, id: editingId } : cert)),
      )
      setEditingId(null)
    } else {
      setCertifications((prev) => [...prev, { ...currentCertification, id: Date.now().toString() }])
    }
    setCurrentCertification(initialCertification)
  }

  const handleEdit = (certification: Certification) => {
    setCurrentCertification(certification)
    setEditingId(certification.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemove = (id: string) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id))
  }

  const handleView = (certification: Certification) => {
    setViewingCertification(certification)
  }

  const isFormValid = () => {
    return currentCertification.name && currentCertification.issuingOrganization && currentCertification.issueDate
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">
          {editingId ? "Edit Certification" : "Add Certification"}
        </h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Certification Name</label>
            <Input
              name="name"
              value={currentCertification.name}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Issuing Organization</label>
            <Input
              name="issuingOrganization"
              value={currentCertification.issuingOrganization}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Issue Date</label>
            <Input
              type="date"
              name="issueDate"
              value={currentCertification.issueDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Expiration Date</label>
            <Input
              type="date"
              name="expirationDate"
              value={currentCertification.expirationDate}
              onChange={handleInputChange}
              className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4">
            {editingId && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null)
                  setCurrentCertification(initialCertification)
                }}
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!isFormValid()}>
              {editingId ? "Update Certification" : "Add Certification"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {certifications.map((certification) => (
            <motion.div
              key={certification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#2D2B6B]">{certification.name}</h3>
                      <p className="text-gray-600">{certification.issuingOrganization}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      Issued: {new Date(certification.issueDate).toLocaleDateString()}
                      {certification.expirationDate && (
                        <> · Expires: {new Date(certification.expirationDate).toLocaleDateString()}</>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleView(certification)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                        onClick={() => handleEdit(certification)}
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(certification.id)}
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

      <ViewCertificationModal
        certification={viewingCertification}
        isOpen={!!viewingCertification}
        onClose={() => setViewingCertification(null)}
      />
    </div>
  )
}

