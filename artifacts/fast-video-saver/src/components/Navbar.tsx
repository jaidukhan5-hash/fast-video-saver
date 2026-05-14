import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full border-b border-white/10 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-background/95 shadow-lg shadow-black/20" : "bg-background/60"}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2" data-testid="nav-logo">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight text-white">Fast Video Saver</span>
          </Link>
          <div className="hidden md:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            Online
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className={`${location === "/" ? "text-white" : "hover:text-white"} transition-colors`} data-testid="nav-home">Home</Link>
          <Link href="/about" className={`${location === "/about" ? "text-white" : "hover:text-white"} transition-colors`} data-testid="nav-about">About</Link>
          <Link href="/contact" className={`${location === "/contact" ? "text-white" : "hover:text-white"} transition-colors`} data-testid="nav-contact">Contact</Link>
          <Link href="/privacy-policy" className={`${location === "/privacy-policy" ? "text-white" : "hover:text-white"} transition-colors`} data-testid="nav-privacy">Privacy</Link>
          <Link href="/terms" className={`${location === "/terms" ? "text-white" : "hover:text-white"} transition-colors`} data-testid="nav-terms">Terms</Link>
          
          <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/90 text-white rounded-lg px-4" 
                  onClick={() => document.getElementById('download-box')?.scrollIntoView({ behavior: 'smooth' })}
                  data-testid="nav-cta-button">
            Download Now
          </Button>
        </div>
      </div>
    </nav>
  );
}
