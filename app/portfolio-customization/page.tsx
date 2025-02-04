"use client"

import { useState } from "react"
import { CustomizationPanel } from "@/components/customization-panel"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Button } from "@/components/ui/button"
import { usePortfolioCustomization } from "@/hooks/use-portfolio-customization"
import { toast } from "@/components/ui/use-toast"

export default function PortfolioCustomizationPage() {
  const { portfolioData, updatePortfolioData } = usePortfolioCustomization()
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    toast({
      title: "Changes Saved",
      description: "Your portfolio changes have been saved successfully.",
    })
  }

  const handlePublish = async () => {
    setIsPublishing(true)
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsPublishing(false)
    toast({
      title: "Portfolio Published",
      description: "Your portfolio is now live and accessible to the public.",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customize Your Portfolio</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <CustomizationPanel data={portfolioData} onUpdate={updatePortfolioData} />
          <div className="mt-6 flex gap-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button onClick={handlePublish} disabled={isPublishing} variant="outline">
              {isPublishing ? "Publishing..." : "Publish Portfolio"}
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-2/3">
          <PortfolioPreview data={portfolioData} />
        </div>
      </div>
    </div>
  )
}

