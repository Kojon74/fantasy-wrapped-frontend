import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isMobile?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  onShare?: () => void;
}

export function NavButtons({
  isMobile = false,
  onPrevious,
  onNext,
  onShare,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`max-w-6xl mx-auto flex justify-between items-center py-4 ${
          isMobile ? "px-4" : "px-8"
        }`}
      >
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
  );
}
