import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewInternshipModalProps {
  internship: {
    title: string
    company: string
    responsibilities: string
    startDate: string
    endDate: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewInternshipModal({ internship, isOpen, onClose }: ViewInternshipModalProps) {
  if (!internship) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{internship.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Company</h4>
              <p className="text-gray-600">{internship.company}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Duration</h4>
              <p className="text-gray-600">
                {new Date(internship.startDate).toLocaleDateString()} -{" "}
                {new Date(internship.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Responsibilities</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{internship.responsibilities}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

