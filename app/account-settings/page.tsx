"use client"

import { useState } from "react"
import { Sidebar } from "@/components/account-settings/sidebar"
import { ProfileInformation } from "@/components/account-settings/profile-information"
import { ChangePassword } from "@/components/account-settings/change-password"
import { BillingSubscription } from "@/components/account-settings/billing-subscription"
import { NotificationPreferences } from "@/components/account-settings/notification-preferences"

export default function AccountSettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileInformation />
      case "password":
        return <ChangePassword />
      case "billing":
        return <BillingSubscription />
      case "notifications":
        return <NotificationPreferences />
      default:
        return <ProfileInformation />
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
        <div className="w-full md:w-3/4">{renderSection()}</div>
      </div>
    </div>
  )
}

