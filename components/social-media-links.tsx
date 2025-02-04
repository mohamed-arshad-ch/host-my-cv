import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface SocialMediaLinksProps {
  links: {
    linkedin: string
    github: string
    behance: string
  }
  onChange: (links: { linkedin: string; github: string; behance: string }) => void
}

export function SocialMediaLinks({ links, onChange }: SocialMediaLinksProps) {
  const handleChange = (platform: string, value: string) => {
    onChange({ ...links, [platform]: value })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={links.linkedin}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://www.linkedin.com/in/yourusername"
        />
      </div>
      <div>
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={links.github}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/yourusername"
        />
      </div>
      <div>
        <Label htmlFor="behance">Behance</Label>
        <Input
          id="behance"
          value={links.behance}
          onChange={(e) => handleChange("behance", e.target.value)}
          placeholder="https://www.behance.net/yourusername"
        />
      </div>
    </div>
  )
}

