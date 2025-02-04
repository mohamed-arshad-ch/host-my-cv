import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewReferenceModalProps {
  reference: {
    name: string
    jobTitle: string
    company: string
    phone: string
    email: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewReferenceModal({ reference, isOpen, onClose }: ViewReferenceModalProps) {
  if (!reference) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{reference.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Job Title</h4>
              <p className="text-gray-600">{reference.jobTitle}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Company</h4>
              <p className="text-gray-600">{reference.company}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Contact Information</h4>
              <p className="text-gray-600">{reference.phone}</p>
              <p className="text-gray-600">{reference.email}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

