"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

export function BillingSubscription() {
  const [selectedPlan, setSelectedPlan] = useState("pro")

  const handleChangePlan = () => {
    // Here you would typically send the data to your backend
    console.log("Changing plan to:", selectedPlan)
    toast({
      title: "Plan Updated",
      description: `Your subscription has been updated to the ${selectedPlan.toUpperCase()} plan.`,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-6">Billing & Subscription</h2>
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the PRO plan</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$19.99/month</p>
          <p className="text-sm text-gray-500">Next billing date: June 1, 2023</p>
        </CardContent>
      </Card>
      <div>
        <h3 className="text-lg font-semibold mb-4">Change Plan</h3>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="basic" id="basic" />
            <Label htmlFor="basic">Basic ($9.99/month)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pro" id="pro" />
            <Label htmlFor="pro">Pro ($19.99/month)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enterprise" id="enterprise" />
            <Label htmlFor="enterprise">Enterprise ($49.99/month)</Label>
          </div>
        </RadioGroup>
      </div>
      <Button onClick={handleChangePlan}>Change Plan</Button>
    </div>
  )
}

