"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from "lucide-react"

interface Hobby {
  id: string
  name: string
}

export function HobbiesForm() {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [currentHobby, setCurrentHobby] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentHobby(e.target.value)
  }

  const handleAdd = () => {
    if (currentHobby.trim()) {
      setHobbies((prev) => [...prev, { id: Date.now().toString(), name: currentHobby.trim() }])
      setCurrentHobby("")
    }
  }

  const handleRemove = (id: string) => {
    setHobbies((prev) => prev.filter((hobby) => hobby.id !== id))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-semibold text-[#2D2B6B] mb-6">Add Hobbies</h2>
        <div className="flex gap-4">
          <Input
            value={currentHobby}
            onChange={handleInputChange}
            placeholder="Enter a hobby"
            className="flex-grow border-[#7C3AED] focus-visible:ring-[#7C3AED]"
          />
          <Button onClick={handleAdd} className="bg-[#7C3AED] hover:bg-[#6D28D9]" disabled={!currentHobby.trim()}>
            Add Hobby
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {hobbies.map((hobby) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="bg-white">
                <CardContent className="p-4 flex justify-between items-center">
                  <span className="font-medium text-gray-700">{hobby.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemove(hobby.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

