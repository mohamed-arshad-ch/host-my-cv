import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ColorPickerProps {
  label: string
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <div className="flex items-center space-x-2">
        <Input
          id={label}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-10 h-10 p-0 border-0"
        />
        <Input type="text" value={color} onChange={(e) => onChange(e.target.value)} className="flex-grow" />
      </div>
    </div>
  )
}

