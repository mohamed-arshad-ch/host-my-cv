import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonalInfoForm } from "@/components/form-sections/personal-info-form"
import { WorkExperienceForm } from "@/components/form-sections/work-experience-form"
import { EducationForm } from "@/components/form-sections/education-form"
import { SkillsForm } from "@/components/form-sections/skills-form"
import { ProjectsForm } from "@/components/form-sections/projects-form"
import { CertificationsForm } from "@/components/form-sections/certifications-form"

interface ResumeFormProps {
  data: any
  onUpdate: (newData: any) => void
  activeSection: string
  setActiveSection: (section: string) => void
}

export function ResumeForm({ data, onUpdate, activeSection, setActiveSection }: ResumeFormProps) {
  return (
    <div className="w-full bg-white p-6 overflow-y-auto">
      <Tabs value={activeSection} onValueChange={setActiveSection}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
          <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        <TabsContent value="personal-info">
          <PersonalInfoForm data={data.personalInfo} onUpdate={(newData) => onUpdate({ personalInfo: newData })} />
        </TabsContent>
        <TabsContent value="work-experience">
          <WorkExperienceForm
            data={data.workExperience}
            onUpdate={(newData) => onUpdate({ workExperience: newData })}
          />
        </TabsContent>
        <TabsContent value="education">
          <EducationForm data={data.education} onUpdate={(newData) => onUpdate({ education: newData })} />
        </TabsContent>
        <TabsContent value="skills">
          <SkillsForm data={data.skills} onUpdate={(newData) => onUpdate({ skills: newData })} />
        </TabsContent>
        <TabsContent value="projects">
          <ProjectsForm data={data.projects} onUpdate={(newData) => onUpdate({ projects: newData })} />
        </TabsContent>
        <TabsContent value="certifications">
          <CertificationsForm
            data={data.certifications}
            onUpdate={(newData) => onUpdate({ certifications: newData })}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

