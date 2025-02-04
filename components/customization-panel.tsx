import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColorPicker } from "@/components/color-picker"
import { FontSelector } from "@/components/font-selector"
import { LayoutSelector } from "@/components/layout-selector"
import { ImageUploader } from "@/components/image-uploader"
import { SocialMediaLinks } from "@/components/social-media-links"

interface CustomizationPanelProps {
  data: any
  onUpdate: (field: string, value: any) => void
}

export function CustomizationPanel({ data, onUpdate }: CustomizationPanelProps) {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="appearance">Appearance</TabsTrigger>
        <TabsTrigger value="social">Social</TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={data.name} onChange={(e) => onUpdate("name", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="title">Professional Title</Label>
            <Input id="title" value={data.title} onChange={(e) => onUpdate("title", e.target.value)} />
          </div>
          <ImageUploader
            label="Profile Picture"
            currentImage={data.profilePicture}
            onUpload={(url) => onUpdate("profilePicture", url)}
          />
          <ImageUploader
            label="Cover Image"
            currentImage={data.coverImage}
            onUpload={(url) => onUpdate("coverImage", url)}
          />
        </div>
      </TabsContent>
      <TabsContent value="appearance">
        <div className="space-y-4">
          <ColorPicker
            label="Primary Color"
            color={data.primaryColor}
            onChange={(color) => onUpdate("primaryColor", color)}
          />
          <ColorPicker
            label="Background Color"
            color={data.backgroundColor}
            onChange={(color) => onUpdate("backgroundColor", color)}
          />
          <FontSelector label="Font" currentFont={data.font} onChange={(font) => onUpdate("font", font)} />
          <LayoutSelector
            label="Layout"
            currentLayout={data.layout}
            onChange={(layout) => onUpdate("layout", layout)}
          />
        </div>
      </TabsContent>
      <TabsContent value="social">
        <SocialMediaLinks links={data.socialLinks} onChange={(links) => onUpdate("socialLinks", links)} />
      </TabsContent>
    </Tabs>
  )
}

