import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewEducationModalProps {
  education: {
    schoolName: string
    degree: string
    fieldOfStudy: string
    startDate: string
    endDate: string
    description: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewEducationModal({ education, isOpen, onClose }: ViewEducationModalProps) {
  if (!education) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{education.schoolName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Degree</h4>
              <p className="text-gray-600">{education.degree}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Field of Study</h4>
              <p className="text-gray-600">{education.fieldOfStudy}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Duration</h4>
              <p className="text-gray-600">
                {new Date(education.startDate).toLocaleDateString()} -{" "}
                {new Date(education.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Description</h4>
            <p className="text-gray-600 whitespace-pre-wrap">{education.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

