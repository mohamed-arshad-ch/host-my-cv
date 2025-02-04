import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react" // Added import for React

interface PersonalInfoFormProps {
  data: {
    name: string
    email: string
    phone: string
    location: string
  }
  onUpdate: (newData: any) => void
}

export function PersonalInfoForm({ data, onUpdate }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ ...data, [e.target.name]: e.target.value })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={data.name} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={data.email} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" value={data.phone} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" value={data.location} onChange={handleChange} />
      </div>
    </div>
  )
}

