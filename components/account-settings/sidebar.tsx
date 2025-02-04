import { Button } from "@/components/ui/button"

interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const sections = [
    { id: "profile", label: "Profile Information" },
    { id: "password", label: "Change Password" },
    { id: "billing", label: "Billing & Subscription" },
    { id: "notifications", label: "Notification Preferences" },
  ]

  return (
    <nav className="space-y-2">
      {sections.map((section) => (
        <Button
          key={section.id}
          variant={activeSection === section.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => setActiveSection(section.id)}
        >
          {section.label}
        </Button>
      ))}
    </nav>
  )
}

