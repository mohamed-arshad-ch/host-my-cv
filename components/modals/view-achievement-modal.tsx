import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ViewAchievementModalProps {
  achievement: {
    name: string
    organization: string
    description: string
    year: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewAchievementModal({ achievement, isOpen, onClose }: ViewAchievementModalProps) {
  if (!achievement) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{achievement.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Issuing Organization</h4>
              <p className="text-gray-600">{achievement.organization}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Year</h4>
              <p className="text-gray-600">{achievement.year}</p>
            </div>
            {achievement.description && (
              <div>
                <h4 className="font-medium text-gray-700">Description</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{achievement.description}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

