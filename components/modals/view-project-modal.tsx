import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ViewProjectModalProps {
  project: {
    name: string
    role: string
    description: string
    technologies: string
    link: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export function ViewProjectModal({ project, isOpen, onClose }: ViewProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2D2B6B]">{project.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="grid gap-4">
            <div>
              <h4 className="font-medium text-gray-700">Role</h4>
              <p className="text-gray-600">{project.role}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Description</h4>
              <p className="text-gray-600 whitespace-pre-wrap">{project.description}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700">Technologies Used</h4>
              <p className="text-gray-600">{project.technologies}</p>
            </div>
            {project.link && (
              <div>
                <h4 className="font-medium text-gray-700">Project Link</h4>
                <Button
                  variant="link"
                  className="p-0 h-auto text-[#7C3AED] hover:text-[#6D28D9]"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  {project.link}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

