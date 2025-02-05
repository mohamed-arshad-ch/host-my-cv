import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

interface SocialLinks {
  website: string
  linkedin: string
  github: string
  behance: string
}

interface SocialLinksFormProps {
  links: SocialLinks
  onUpdate: (links: SocialLinks) => void
}

export function SocialLinksForm({ links, onUpdate }: SocialLinksFormProps) {
  const handleChange = (platform: keyof SocialLinks, value: string) => {
    onUpdate({ ...links, [platform]: value })
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Saving social links:", links)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="website">Personal Website</Label>
          <Input
            id="website"
            value={links.website}
            onChange={(e) => handleChange("website", e.target.value)}
            placeholder="https://www.yourwebsite.com"
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={links.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            placeholder="https://www.linkedin.com/in/yourusername"
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={links.github}
            onChange={(e) => handleChange("github", e.target.value)}
            placeholder="https://github.com/yourusername"
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
        <div>
          <Label htmlFor="behance">Behance</Label>
          <Input
            id="behance"
            value={links.behance}
            onChange={(e) => handleChange("behance", e.target.value)}
            placeholder="https://www.behance.net/yourusername"
            className="border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
        </div>
      </div>
      <Button onClick={handleSave} className="bg-[#7C3AED] hover:bg-[#6D28D9]">
        Save Changes
      </Button>
    </div>
  )
}

