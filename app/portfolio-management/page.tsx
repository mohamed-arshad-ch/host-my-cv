import { PortfolioList } from "@/components/portfolio-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function PortfolioManagementPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Portfolios</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Portfolio
        </Button>
      </div>
      <PortfolioList />
    </div>
  )
}

