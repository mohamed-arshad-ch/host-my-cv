import { Button } from "@/components/ui/button"

const categories = ["All", "Modern", "Minimalist", "Creative"]

interface CategoryFilterProps {
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          onClick={() => onSelectCategory(category === "All" ? null : category)}
          className="px-4 py-2 rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

