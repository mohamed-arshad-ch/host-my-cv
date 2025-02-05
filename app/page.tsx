import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { ArrowRight, FileText, Globe, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { MotionDiv } from "@/components/motion-wrapper"
import type React from "react" // Added import for React

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />

      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto text-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Create Professional CVs That Stand Out</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Build and host your professional CV in minutes. Choose from modern templates, customize your design, and
              share your CV with the world.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/login">
                  Create Your CV <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                View Templates
              </Button>
            </div>
          </MotionDiv>

        
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything You Need to Create a Perfect CV</h2>
            <p className="mt-4 text-xl text-gray-600">Simple, powerful features that help you stand out</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FileText className="h-8 w-8" />}
              title="Modern Templates"
              description="Choose from our collection of professionally designed templates that help you stand out."
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8" />}
              title="Easy Customization"
              description="Customize every aspect of your CV with our intuitive editor."
            />
            <FeatureCard
              icon={<Globe className="h-8 w-8" />}
              title="Online Hosting"
              description="Get a unique URL for your CV that you can share with employers."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Create Your CV in Three Simple Steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Choose a Template"
              description="Select from our collection of professional templates."
            />
            <StepCard
              number="2"
              title="Add Your Content"
              description="Fill in your details with our easy-to-use editor."
            />
            <StepCard
              number="3"
              title="Download or Share"
              description="Get your CV in PDF format or share it online."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Create Your Professional CV?</h2>
            <p className="text-xl text-primary-foreground/90">
              Join thousands of professionals who have already created their CVs with us.
            </p>
            <Button size="lg" variant="secondary" asChild className="bg-white text-primary hover:bg-white/90">
              <Link href="/login">
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Templates
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Guide
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Host My CV. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

