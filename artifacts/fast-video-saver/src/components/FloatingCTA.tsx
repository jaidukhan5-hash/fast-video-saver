import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-20 right-4 z-40 md:hidden transition-all duration-300 ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
    }`}>
      <Button
        size="lg"
        className="h-14 w-14 rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/40 animate-pulse-glow"
        onClick={() => {
          document.getElementById("download-box")?.scrollIntoView({ behavior: "smooth" });
        }}
        data-testid="floating-cta-button"
        aria-label="Scroll to download"
      >
        <Download className="h-6 w-6" />
      </Button>
    </div>
  );
}
