"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { PlusCircle, Copy, Share2, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for recent resumes and portfolio links
const recentResumes = [
  { id: 1, name: "Software Engineer Resume", preview: "/placeholder.svg?height=100&width=80" },
  { id: 2, name: "Product Manager CV", preview: "/placeholder.svg?height=100&width=80" },
  { id: 3, name: "Data Analyst Resume", preview: "/placeholder.svg?height=100&width=80" },
]

const portfolioLinks = [
  { id: 1, name: "Personal Website", url: "https://johndoe.com" },
  { id: 2, name: "Project Showcase", url: "https://projects.johndoe.com" },
]

export function DashboardContent() {
  const [userName] = useState("John Doe") // In a real app, this would come from authentication
  const [stats] = useState({ views: 1234, downloads: 567 })

  return (
    <div className="flex-1 p-8 overflow-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {userName}!</h1>
      </header>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Recent Resumes</h2>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Resume
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentResumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-lg shadow-md p-4 flex items-center">
                <img
                  src={resume.preview || "/placeholder.svg"}
                  alt={resume.name}
                  className="w-20 h-25 object-cover rounded mr-4"
                />
                <div>
                  <h3 className="font-medium text-gray-800">{resume.name}</h3>
                  <Button variant="link" className="text-primary-600 p-0 h-auto">
                    Edit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Portfolio Links</h2>
          <div className="bg-white rounded-lg shadow-md p-4">
            {portfolioLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between py-2">
                <span className="font-medium text-gray-800">{link.name}</span>
                <div>
                  <Button variant="outline" size="sm" className="mr-2">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-600">Total Views</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.views}</p>
                </div>
                <Eye className="h-10 w-10 text-primary-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-600">Total Downloads</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.downloads}</p>
                </div>
                <Download className="h-10 w-10 text-primary-600" />
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  )
}

