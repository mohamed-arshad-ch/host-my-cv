import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ImageUploaderProps {
  label: string
  currentImage: string
  onUpload: (url: string) => void
}

export function ImageUploader({ label, currentImage, onUpload }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState(currentImage)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreviewUrl(result)
        onUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      <Label htmlFor={label}>{label}</Label>
      <div className="mt-2 flex items-center space-x-4">
        <div className="relative w-20 h-20 border rounded-md overflow-hidden">
          <Image
            src={previewUrl || "/placeholder.svg?height=80&width=80"}
            alt={label}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <Input id={label} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <Button onClick={() => document.getElementById(label)?.click()} type="button">
          Upload Image
        </Button>
      </div>
    </div>
  )
}

