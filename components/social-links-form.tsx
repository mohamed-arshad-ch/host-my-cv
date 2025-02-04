import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

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
  console.log("SocialLinksForm props:", { links, onUpdate })
  const handleChange = (platform: keyof SocialLinks, value: string) => {
    if (typeof onUpdate !== "function") {
      console.error("onUpdate is not a function", onUpdate)
      return
    }
    onUpdate({ ...links, [platform]: value })
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
    </div>
  )
}

