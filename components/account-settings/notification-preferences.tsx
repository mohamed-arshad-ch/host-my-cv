"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export function NotificationPreferences() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  })

  const handleToggle = (name: string) => {
    setPreferences((prev) => ({ ...prev, [name]: !prev[name as keyof typeof preferences] }))
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Saving notification preferences:", preferences)
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications" className="flex-grow">
            Email Notifications
          </Label>
          <Switch
            id="emailNotifications"
            checked={preferences.emailNotifications}
            onCheckedChange={() => handleToggle("emailNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="smsNotifications" className="flex-grow">
            SMS Notifications
          </Label>
          <Switch
            id="smsNotifications"
            checked={preferences.smsNotifications}
            onCheckedChange={() => handleToggle("smsNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="marketingEmails" className="flex-grow">
            Marketing Emails
          </Label>
          <Switch
            id="marketingEmails"
            checked={preferences.marketingEmails}
            onCheckedChange={() => handleToggle("marketingEmails")}
          />
        </div>
      </div>
      <Button onClick={handleSave}>Save Preferences</Button>
    </div>
  )
}

