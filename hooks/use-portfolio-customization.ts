import { useState } from "react"

const initialPortfolioData = {
  name: "John Doe",
  title: "Software Developer",
  profilePicture: "",
  coverImage: "",
  primaryColor: "#3B82F6",
  backgroundColor: "#FFFFFF",
  font: "Inter",
  layout: "centered",
  socialLinks: {
    linkedin: "",
    github: "",
    behance: "",
  },
}

export function usePortfolioCustomization() {
  const [portfolioData, setPortfolioData] = useState(initialPortfolioData)

  const updatePortfolioData = (field: string, value: any) => {
    setPortfolioData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  return { portfolioData, updatePortfolioData }
}

