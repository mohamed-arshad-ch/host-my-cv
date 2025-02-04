import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewCertificationModalProps {
  certification: {
    name: string
    issuingOrganization: string
    issueDate: string
    expirationDate: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewCertificationModal({ certification, isOpen, onClose }: ViewCertificationModalProps) {
  if (!certification) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{certification.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Issuing Organization</h4>
              <p className="text-gray-600">{certification.issuingOrganization}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Issue Date</h4>
              <p className="text-gray-600">{new Date(certification.issueDate).toLocaleDateString()}</p>
            </div>
            {certification.expirationDate && (
              <div>
                <h4 className="font-medium text-gray-700">Expiration Date</h4>
                <p className="text-gray-600">{new Date(certification.expirationDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

