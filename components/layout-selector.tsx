import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const layouts = ["centered", "left-aligned"]

interface LayoutSelectorProps {
  label: string
  currentLayout: string
  onChange: (layout: string) => void
}

export function LayoutSelector({ label, currentLayout, onChange }: LayoutSelectorProps) {
  return (
    <div>
      <Label>{label}</Label>
      <RadioGroup value={currentLayout} onValueChange={onChange}>
        {layouts.map((layout) => (
          <div key={layout} className="flex items-center space-x-2">
            <RadioGroupItem value={layout} id={layout} />
            <Label htmlFor={layout}>{layout}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

