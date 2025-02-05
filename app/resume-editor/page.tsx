"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LayoutGrid, Briefcase, GraduationCap, Wrench, Award, FolderGit2, Globe, Heart } from "lucide-react"
import { WorkExperienceForm } from "@/components/form-sections/work-experience-form"
import { EducationForm } from "@/components/form-sections/education-form"
import { SkillsForm } from "@/components/form-sections/skills-form"
import { CertificationsForm } from "@/components/form-sections/certifications-form"
import { ProjectsForm } from "@/components/form-sections/projects-form"
import { InternshipsForm } from "@/components/form-sections/internships-form"
import { AchievementsForm } from "@/components/form-sections/achievements-form"
import { LanguageForm } from "@/components/form-sections/language-form"
import { ReferencesForm } from "@/components/form-sections/references-form"
import { SocialLinksForm } from "@/components/form-sections/social-links-form"
import { AddressForm } from "@/components/form-sections/address-form"

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

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    summary: "",
    email: "",
    phone: "",
    location: "",
  },
  socialLinks: {
    website: "",
    linkedin: "",
    github: "",
    behance: "",
  },
  address: {
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
  workExperience: [],
  internships: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  achievements: [],
  languages: [],
  references: [],
}

export default function ResumeEditorPage() {
 
  const { user, logout,login } = useAuth()
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)

  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
          console.log(user);
          fetchResumeData(user)
      } else {
        router.push('/login')
      }
    })

    return () => unsubscribe()
  }, [router])

  
  // useEffect(() => {
   
  //   if (!user) {
  //     router.push("/login")
  //   } else {
  //     fetchResumeData()
  //   }
  // }, [user,router])

  const fetchResumeData = async (user:any) => {
   
      const docRef = doc(db, "resumes", user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setResumeData(docSnap.data() as ResumeData)
      }
    
  }

  const handlePreview = () => {
    router.push("/resume-preview")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setResumeData((prevData) => ({
      ...prevData,
      personalInfo: { ...prevData.personalInfo, [name]: value },
    }))
  }

  const handleSave = async () => {
    
      try {
        await setDoc(doc(db, "resumes", user.uid), resumeData)
        console.log("Resume data saved successfully")
      } catch (error) {
        console.error("Error saving resume data:", error)
      }
    
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r flex flex-col items-center py-8 space-y-8">
        <Logo />
        <nav className="flex flex-col items-center space-y-6">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <LayoutGrid className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <Briefcase className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <GraduationCap className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <Wrench className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <Award className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <FolderGit2 className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-[#7C3AED]">
            <Heart className="h-5 w-5" />
          </Button>
        </nav>
      </div>
      {/* Main Content */}
      <div className="ml-16 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#2D2B6B]">Let&apos;s Edit Your Resume</h1>
            <div className="flex gap-4">
              <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]" onClick={handleSave}>
                Save Changes
              </Button>
              <Button
                variant="outline"
                className="border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED]/5"
                onClick={handlePreview}
              >
                Preview
              </Button>
              <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <Tabs defaultValue="personal" className="mb-8">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b overflow-x-auto flex whitespace-nowrap scrollbar-hide">
              <TabsTrigger
                value="personal"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Personal
              </TabsTrigger>
              <TabsTrigger
                value="work"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Work Experience
              </TabsTrigger>
              <TabsTrigger
                value="internships"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Internships
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Education
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Skills
              </TabsTrigger>
              <TabsTrigger
                value="certifications"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Certifications
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Achievements
              </TabsTrigger>
              <TabsTrigger
                value="language"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Language
              </TabsTrigger>
              <TabsTrigger
                value="references"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                References
              </TabsTrigger>
              <TabsTrigger
                value="social-links"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Social Links
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent text-gray-600 data-[state=active]:text-[#7C3AED]"
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="personal">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <Input
                    name="fullName"
                    value={resumeData.personalInfo.fullName}
                    onChange={handleInputChange}
                    className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Job Title</label>
                  <Input
                    name="jobTitle"
                    value={resumeData.personalInfo.jobTitle}
                    onChange={handleInputChange}
                    className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Summary</label>
                  <Textarea
                    name="summary"
                    value={resumeData.personalInfo.summary}
                    onChange={handleInputChange}
                    placeholder="A short bio about skills and expertise"
                    className="min-h-[150px] border-[#7C3AED] focus-visible:ring-[#7C3AED]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <Input
                    name="email"
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={handleInputChange}
                    className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={handleInputChange}
                    className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <Input
                    name="location"
                    value={resumeData.personalInfo.location}
                    onChange={handleInputChange}
                    className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={handleSave} className="bg-[#7C3AED] hover:bg-[#6D28D9]">
                  Save Changes
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="work">
              <WorkExperienceForm
                data={resumeData.workExperience}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, workExperience: newData }))}
              />
            </TabsContent>
            <TabsContent value="internships">
              <InternshipsForm
                data={resumeData.internships}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, internships: newData }))}
              />
            </TabsContent>
            <TabsContent value="education">
              <EducationForm
                data={resumeData.education}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, education: newData }))}
              />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsForm
                data={resumeData.skills}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, skills: newData }))}
              />
            </TabsContent>
            <TabsContent value="certifications">
              <CertificationsForm
                data={resumeData.certifications}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, certifications: newData }))}
              />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsForm
                data={resumeData.projects}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, projects: newData }))}
              />
            </TabsContent>
            <TabsContent value="achievements">
              <AchievementsForm
                data={resumeData.achievements}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, achievements: newData }))}
              />
            </TabsContent>
            <TabsContent value="language">
              <LanguageForm
                data={resumeData.languages}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, languages: newData }))}
              />
            </TabsContent>
            <TabsContent value="references">
              <ReferencesForm
                data={resumeData.references}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, references: newData }))}
              />
            </TabsContent>
            <TabsContent value="social-links">
              <SocialLinksForm
                links={resumeData.socialLinks}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, socialLinks: newData }))}
              />
            </TabsContent>
            <TabsContent value="address">
              <AddressForm
                data={resumeData.address}
                onUpdate={(newData) => setResumeData((prev) => ({ ...prev, address: newData }))}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

