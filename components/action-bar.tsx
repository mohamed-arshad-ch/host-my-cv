import { Button } from "@/components/ui/button"
import { Undo2, Redo2, Save, Download, Globe } from "lucide-react"

interface ActionBarProps {
  onSave: () => void
  onDownload: () => void
  onHost: () => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}

export function ActionBar({ onSave, onDownload, onHost, onUndo, onRedo, canUndo, canRedo }: ActionBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="space-x-2">
        <Button variant="outline" size="icon" onClick={onUndo} disabled={!canUndo}>
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onRedo} disabled={!canRedo}>
          <Redo2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-x-2">
        <Button variant="outline" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="outline" onClick={onDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        <Button onClick={onHost}>
          <Globe className="h-4 w-4 mr-2" />
          Host Online
        </Button>
      </div>
    </div>
  )
}

