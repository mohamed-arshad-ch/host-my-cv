import { useState, useCallback } from "react"

interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  workExperience: Array<{
    company: string
    position: string
    startDate: string
    endDate: string
    description: string
  }>
  education: Array<{
    school: string
    degree: string
    fieldOfStudy: string
    graduationDate: string
  }>
  skills: string[]
  projects: Array<{
    name: string
    description: string
    technologies: string[]
  }>
  certifications: Array<{
    name: string
    issuer: string
    date: string
  }>
}

const initialResumeData: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", location: "" },
  workExperience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
}

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [history, setHistory] = useState<ResumeData[]>([initialResumeData])
  const [historyIndex, setHistoryIndex] = useState(0)

  const updateResumeData = useCallback(
    (newData: Partial<ResumeData>) => {
      setResumeData((prevData) => {
        const updatedData = { ...prevData, ...newData }
        setHistory((prev) => [...prev.slice(0, historyIndex + 1), updatedData])
        setHistoryIndex((prev) => prev + 1)
        return updatedData
      })
    },
    [historyIndex],
  )

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1)
      setResumeData(history[historyIndex - 1])
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1)
      setResumeData(history[historyIndex + 1])
    }
  }, [history, historyIndex])

  return {
    resumeData,
    updateResumeData,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
  }
}

