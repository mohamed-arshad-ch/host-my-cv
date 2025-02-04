"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Download, ArrowLeft } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface ResumeData {
  personalInfo: {
    fullName: string
    jobTitle: string
    summary: string
    email: string
    phone: string
    location: string
  }
  socialLinks: {
    website: string
    linkedin: string
    github: string
    behance: string
  }
  address: {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  workExperience: Array<{
    id: string
    jobTitle: string
    companyName: string
    companyLocation: string
    skillsUsed: string
    startDate: string
    endDate: string
    responsibilities: string
  }>
  internships: Array<{
    id: string
    title: string
    company: string
    responsibilities: string
    startDate: string
    endDate: string
  }>
  education: Array<{
    id: string
    schoolName: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
    description: string
  }>
  skills: string[]
  certifications: Array<{
    id: string
    name: string
    issuingOrganization: string
    issueDate: string
    expirationDate: string
  }>
  projects: Array<{
    id: string
    name: string
    role: string
    description: string
    technologies: string
    link: string
  }>
  achievements: Array<{
    id: string
    name: string
    organization: string
    description: string
    year: string
  }>
  languages: Array<{
    id: string
    name: string
    proficiency: string
  }>
  references: Array<{
    id: string
    name: string
    jobTitle: string
    company: string
    phone: string
    email: string
  }>
}

const sampleData: ResumeData = {
  personalInfo: {
    fullName: "Cheng Kun",
    jobTitle: "Software Engineer",
    summary:
      "Driven computer science student with hands-on experience in developing user-friendly software applications, coding, testing features, and offering engineering support. Possessing Oracle Certified Professional accreditation, proficient in various programming languages and software development tools, adept at problem-solving, and excelling in team environments.",
    email: "chengkun@gmail.com",
    phone: "604-644-4365",
    location: "Waterloo, ON",
  },
  socialLinks: {
    website: "",
    linkedin: "",
    github: "",
    behance: "",
  },
  address: {
    street: "4072 Cordova Street",
    city: "Waterloo",
    state: "ON",
    country: "Canada",
    postalCode: "V6B 1E1",
  },
  workExperience: [
    {
      id: "1",
      jobTitle: "Software Intern",
      companyName: "Intel Corporation",
      companyLocation: "HILLSBORO, OR, UNITED STATES",
      skillsUsed: "JavaScript, C++",
      startDate: "05/2018",
      endDate: "08/2018",
      responsibilities:
        "Collaborated with colleagues to develop innovative software applications, enhancing Intel's website functionality. Coded and tested multiple features to deliver a superior user experience. Created single page applications and generated progress reports for assigned projects. Engaged with senior engineers and product managers to provide engineering support. Received recognition as Employee of the Month for outstanding performance.",
    },
  ],
  internships: [],
  education: [
    {
      id: "1",
      schoolName: "University of Waterloo",
      degree: "Computer Science",
      fieldOfStudy: "Computer Science",
      startDate: "09/2016",
      endDate: "present",
      description:
        "Achieved a GPA of 3.96. Participated in clubs and societies including Astronomy Society, Physics Society, and Engineering Society.",
    },
    {
      id: "2",
      schoolName: "Yali High School",
      degree: "High School",
      fieldOfStudy: "General",
      startDate: "09/2012",
      endDate: "06/2016",
      description:
        "Achieved Graduation with Distinction, earning Grade 1 (equivalent to an A/excellent) in all subjects. Participated in extracurricular activities including the Hockey Team, Chess Club, and Math Society",
    },
  ],
  skills: ["JavaScript", "C++", "Java", "Swift", "Microsoft Office"],
  certifications: [],
  projects: [],
  achievements: [],
  languages: [
    { id: "1", name: "Chinese", proficiency: "Native" },
    { id: "2", name: "English", proficiency: "Full" },
    { id: "3", name: "Japanese", proficiency: "Limited" },
  ],
  references: [],
}

export default function ResumePreviewPage() {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData>(sampleData)

  useEffect(() => {
    const storedData = localStorage.getItem("resumeData")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setResumeData((prevData) => ({
          ...prevData,
          ...parsedData,
        }))
      } catch (error) {
        console.error("Error parsing stored data:", error)
      }
    }
  }, [])

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

  const SkillBar = ({ level }: { level: number }) => (
    <div className="relative w-32 h-1 bg-gray-200">
      <div className="absolute top-0 left-0 h-full bg-[#9333EA]" style={{ width: `${level}%` }} />
      <div
        className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#9333EA]"
        style={{ left: `${level}%` }}
      />
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <Button variant="outline" onClick={() => router.back()} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Edit
          </Button>
          <Button onClick={handleDownloadPDF} className="bg-[#9333EA] hover:bg-[#7E22CE]">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>

        <div id="resume-preview" className="bg-white p-12 shadow-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 inline-block border-[1px] border-gray-300 px-8 py-2">
              {resumeData.personalInfo.fullName}
            </h1>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-semibold">Address:</span> {resumeData.address.street}, {resumeData.address.city},{" "}
                {resumeData.address.state} {resumeData.address.postalCode}, {resumeData.address.country}
                <span className="mx-2 font-semibold">Phone number:</span> {resumeData.personalInfo.phone}
              </p>
              <p>
                <span className="font-semibold">Email address:</span> {resumeData.personalInfo.email}
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-[140px] top-0 bottom-0 w-[1px] bg-gray-200">
              <div className="absolute top-[2.5rem] left-[-4px] w-2 h-2 rounded-full bg-[#9333EA]" />
              <div className="absolute top-[12rem] left-[-4px] w-2 h-2 rounded-full bg-[#9333EA]" />
              <div className="absolute top-[24rem] left-[-4px] w-2 h-2 rounded-full bg-[#9333EA]" />
              <div className="absolute top-[36rem] left-[-4px] w-2 h-2 rounded-full bg-[#9333EA]" />
            </div>

            {/* Content */}
            <div className="grid grid-cols-[120px_1fr] gap-8">
              {/* Profile Section */}
              <div className="font-bold text-sm">PROFILE</div>
              <div className="pl-8 pb-8">
                <p className="text-sm">{resumeData.personalInfo.summary}</p>
              </div>

              {/* Work Experience Section */}
              <div className="font-bold text-sm">WORK EXPERIENCE</div>
              <div className="pl-8 pb-8">
                {resumeData.workExperience.map((exp, index) => (
                  <div key={exp.id} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold">{exp.jobTitle}</h3>
                        <p className="text-sm">{exp.companyName}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p>
                          {exp.startDate} - {exp.endDate}
                        </p>
                        <p>{exp.companyLocation}</p>
                      </div>
                    </div>
                    <p className="text-sm">{exp.responsibilities}</p>
                  </div>
                ))}
              </div>

              {/* Education Section */}
              <div className="font-bold text-sm">EDUCATION</div>
              <div className="pl-8 pb-8">
                {resumeData.education.map((edu, index) => (
                  <div key={edu.id} className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold">{edu.degree}</h3>
                        <p className="text-sm">{edu.schoolName}</p>
                      </div>
                      <div className="text-sm text-right">
                        <p>
                          {edu.startDate} - {edu.endDate}
                        </p>
                        <p>{edu.fieldOfStudy}</p>
                      </div>
                    </div>
                    <p className="text-sm">{edu.description}</p>
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="font-bold text-sm">SKILLS</div>
              <div className="pl-8">
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Sections */}
              {resumeData.certifications.length > 0 && (
                <>
                  <div className="font-bold text-sm">CERTIFICATIONS</div>
                  <div className="pl-8 pb-8">
                    {resumeData.certifications.map((cert) => (
                      <div key={cert.id} className="mb-4">
                        <h3 className="font-bold">{cert.name}</h3>
                        <p className="text-sm">{cert.issuingOrganization}</p>
                        <p className="text-sm">Issued: {cert.issueDate}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {resumeData.projects.length > 0 && (
                <>
                  <div className="font-bold text-sm">PROJECTS</div>
                  <div className="pl-8 pb-8">
                    {resumeData.projects.map((project) => (
                      <div key={project.id} className="mb-4">
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-sm">{project.role}</p>
                        <p className="text-sm">{project.description}</p>
                        <p className="text-sm">Technologies: {project.technologies}</p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                          >
                            Project Link
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {resumeData.achievements.length > 0 && (
                <>
                  <div className="font-bold text-sm">ACHIEVEMENTS</div>
                  <div className="pl-8 pb-8">
                    {resumeData.achievements.map((achievement) => (
                      <div key={achievement.id} className="mb-4">
                        <h3 className="font-bold">{achievement.name}</h3>
                        <p className="text-sm">
                          {achievement.organization} - {achievement.year}
                        </p>
                        <p className="text-sm">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {resumeData.languages.length > 0 && (
                <>
                  <div className="font-bold text-sm">LANGUAGES</div>
                  <div className="pl-8 pb-8">
                    {resumeData.languages.map((language) => (
                      <div key={language.id} className="mb-2">
                        <span className="font-medium">{language.name}:</span> {language.proficiency}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {resumeData.references.length > 0 && (
                <>
                  <div className="font-bold text-sm">REFERENCES</div>
                  <div className="pl-8 pb-8">
                    {resumeData.references.map((reference) => (
                      <div key={reference.id} className="mb-4">
                        <h3 className="font-bold">{reference.name}</h3>
                        <p className="text-sm">
                          {reference.jobTitle} at {reference.company}
                        </p>
                        <p className="text-sm">Phone: {reference.phone}</p>
                        <p className="text-sm">Email: {reference.email}</p>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

