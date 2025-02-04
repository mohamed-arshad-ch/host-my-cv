import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const fonts = ["Inter", "Roboto", "Open Sans", "Lato", "Poppins"]

interface FontSelectorProps {
  label: string
  currentFont: string
  onChange: (font: string) => void
}

export function FontSelector({ label, currentFont, onChange }: FontSelectorProps) {
  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <Select value={currentFont} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue>{currentFont}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

