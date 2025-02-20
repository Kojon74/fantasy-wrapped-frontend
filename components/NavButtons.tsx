import type { ReactNode } from "react"
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LayoutProps {
  children: ReactNode
  isMobile?: boolean
  onPrevious?: () => void
  onNext?: () => void
  onShare?: () => void
}

export function Layout({ children, isMobile = false, onPrevious, onNext, onShare }: LayoutProps) {
  return (
    <div className={`min-h-screen text-white ${isMobile ? "max-w-md mx-auto" : "container mx-auto"}`}>
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow">{children}</div>
        <div className="sticky bottom-0 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className={`flex justify-between items-center py-4 ${isMobile ? "px-4" : "px-8"}`}>
            <Button variant="ghost" onClick={onPrevious} disabled={!onPrevious}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button variant="ghost" onClick={onShare}>
              <Share2 className="h-6 w-6" />
            </Button>
            <Button variant="ghost" onClick={onNext} disabled={!onNext}>
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

