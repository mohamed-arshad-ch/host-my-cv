"use client"

import { useState } from "react"
import { TemplateGrid } from "@/components/template-grid"
import { CategoryFilter } from "@/components/category-filter"

export default function ResumeTemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Choose Your Resume Template</h1>
      <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <TemplateGrid selectedCategory={selectedCategory} />
    </div>
  )
}

