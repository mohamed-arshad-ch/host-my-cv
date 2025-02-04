import Image from "next/image"
import { FaLinkedin, FaGithub, FaBehance } from "react-icons/fa"

interface PortfolioPreviewProps {
  data: any
}

export function PortfolioPreview({ data }: PortfolioPreviewProps) {
  const { name, title, profilePicture, coverImage, primaryColor, backgroundColor, font, layout, socialLinks } = data

  return (
    <div
      className="border rounded-lg overflow-hidden shadow-lg"
      style={{
        fontFamily: font,
        backgroundColor: backgroundColor,
        color: primaryColor,
      }}
    >
      <div className="relative h-48">
        <Image
          src={coverImage || "/placeholder.svg?height=192&width=768"}
          alt="Cover"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className={`p-6 ${layout === "centered" ? "text-center" : ""}`}>
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={profilePicture || "/placeholder.svg?height=128&width=128"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <h2 className="text-xl mb-4">{title}</h2>
        <div className="flex justify-center space-x-4 mb-6">
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
          )}
          {socialLinks.github && (
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
              <FaGithub size={24} />
            </a>
          )}
          {socialLinks.behance && (
            <a href={socialLinks.behance} target="_blank" rel="noopener noreferrer">
              <FaBehance size={24} />
            </a>
          )}
        </div>
        {/* Add more sections here based on the user's resume data */}
      </div>
    </div>
  )
}

