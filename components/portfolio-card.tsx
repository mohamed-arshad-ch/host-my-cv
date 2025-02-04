import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Copy, Eye } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Portfolio {
  id: string
  name: string
  url: string
  status: "Active" | "Draft" | "Expired"
  lastUpdated: string
}

interface PortfolioCardProps {
  portfolio: Portfolio
  onDelete: () => void
}

export function PortfolioCard({ portfolio, onDelete }: PortfolioCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${portfolio.url}`)
    toast({
      title: "Link Copied",
      description: "The portfolio link has been copied to your clipboard.",
    })
  }

  const handleDelete = () => {
    setIsDeleting(true)
    // Simulating an API call
    setTimeout(() => {
      onDelete()
      setIsDeleting(false)
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{portfolio.name}</h2>
          <p className="text-sm text-gray-600 mb-2">https://{portfolio.url}</p>
          <div className="flex items-center space-x-2">
            <Badge
              variant={
                portfolio.status === "Active" ? "default" : portfolio.status === "Draft" ? "secondary" : "destructive"
              }
            >
              {portfolio.status}
            </Badge>
            <span className="text-sm text-gray-500">Last updated: {portfolio.lastUpdated}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleCopyLink}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting}>
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

