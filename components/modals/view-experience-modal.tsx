import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewExperienceModalProps {
  experience: {
    jobTitle: string
    companyName: string
    companyLocation: string
    skillsUsed: string
    startDate: string
    endDate: string
    responsibilities: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewExperienceModal({ experience, isOpen, onClose }: ViewExperienceModalProps) {
  if (!experience) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{experience.jobTitle}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Company</h4>
              <p className="text-gray-600">{experience.companyName}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Location</h4>
              <p className="text-gray-600">{experience.companyLocation}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Duration</h4>
              <p className="text-gray-600">
                {new Date(experience.startDate).toLocaleDateString()} -{" "}
                {new Date(experience.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Skills</h4>
              <p className="text-gray-600">{experience.skillsUsed}</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Responsibilities</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{experience.responsibilities}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

