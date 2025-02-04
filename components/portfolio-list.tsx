"use client"

import { useState } from "react"
import { PortfolioCard } from "@/components/portfolio-card"

// Mock data for portfolios
const initialPortfolios = [
  {
    id: "1",
    name: "Software Engineer Portfolio",
    url: "john-doe-dev.hostmycv.com",
    status: "Active",
    lastUpdated: "2023-05-15",
  },
  {
    id: "2",
    name: "Graphic Design Showcase",
    url: "jane-smith-design.hostmycv.com",
    status: "Draft",
    lastUpdated: "2023-05-10",
  },
  {
    id: "3",
    name: "Marketing Expert Portfolio",
    url: "mark-johnson-marketing.hostmycv.com",
    status: "Expired",
    lastUpdated: "2023-04-01",
  },
]

export function PortfolioList() {
  const [portfolios, setPortfolios] = useState(initialPortfolios)

  const handleDelete = (id: string) => {
    setPortfolios(portfolios.filter((portfolio) => portfolio.id !== id))
  }

  return (
    <div className="space-y-4">
      {portfolios.map((portfolio) => (
        <PortfolioCard key={portfolio.id} portfolio={portfolio} onDelete={() => handleDelete(portfolio.id)} />
      ))}
    </div>
  )
}

