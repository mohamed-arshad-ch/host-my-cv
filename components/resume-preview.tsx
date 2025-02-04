"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ResumePreviewProps {
  isOpen: boolean
  onClose: () => void
  data: {
    personalInfo: {
      fullName: string
      jobTitle: string
      summary: string
      email: string
      phone: string
      location: string
    }
    workExperience: Array<{
      company: string
      position: string
      startDate: string
      endDate: string
      description: string[]
    }>
    education: Array<{
      school: string
      degree: string
      graduationDate: string
    }>
    skills: string[]
    socialLinks: {
      website?: string
    }
  }
}

export function ResumePreview({ isOpen, onClose, data }: ResumePreviewProps) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview")
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/jpeg", 1.0)
      const pdf = new jsPDF({
        format: "a4",
        unit: "px",
      })

      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight)
      pdf.save("resume.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <div className="flex justify-end mb-4">
          <Button onClick={handleDownloadPDF} className="bg-[#7C3AED] hover:bg-[#6D28D9]">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
        <div id="resume-preview" className="bg-white p-8 shadow-sm">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#2D2B6B] mb-4">{data.personalInfo.fullName}</h1>
            <div className="text-gray-600 text-sm space-y-1">
              <p>
                {data.personalInfo.location} • {data.personalInfo.phone} • {data.personalInfo.email}
              </p>
              {data.socialLinks.website && <p>{data.socialLinks.website}</p>}
            </div>
          </div>

          {/* Summary Section */}
          {data.personalInfo.summary && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2D2B6B] mb-2 border-b border-gray-200 pb-1">SUMMARY</h2>
              <p className="text-gray-700 whitespace-pre-line">{data.personalInfo.summary}</p>
            </section>
          )}

          {/* Work Experience Section */}
          {data.workExperience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2D2B6B] mb-2 border-b border-gray-200 pb-1">WORK EXPERIENCE</h2>
              {data.workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-gray-600">{exp.company}</p>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {/* Education Section */}
          {data.education.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-bold text-[#2D2B6B] mb-2 border-b border-gray-200 pb-1">EDUCATION</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{edu.graduationDate}</p>
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills Section */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-[#2D2B6B] mb-2 border-b border-gray-200 pb-1">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="text-gray-700">
                    {skill}
                    {index < data.skills.length - 1 && " •"}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

