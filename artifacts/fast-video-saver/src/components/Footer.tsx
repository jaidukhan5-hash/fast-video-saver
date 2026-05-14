import { Link } from "wouter";
import { Zap, Mail } from "lucide-react";
import { SiPinterest, SiTelegram, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/95 py-12 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="space-y-4 col-span-1 md:col-span-2">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg text-white">Fast Video Saver</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-xs">
            The premium tool to download videos from your favorite platforms instantly, securely, and for free.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="text-muted-foreground hover:text-red-500 transition-colors" data-testid="footer-pinterest" title="Pinterest">
              <SiPinterest className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-blue-400 transition-colors" data-testid="footer-telegram" title="Telegram">
              <SiTelegram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-sky-400 transition-colors" data-testid="footer-x" title="Twitter/X">
              <SiX className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-white transition-colors" data-testid="footer-mail" title="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Legal</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/privacy-policy" className="hover:text-white transition-colors" data-testid="footer-privacy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors" data-testid="footer-terms">Terms of Service</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Product</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            <a href="#" className="hover:text-white transition-colors">Supported Platforms</a>
            <a href="#" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Guides</h3>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/guides/how-to-download-instagram-reels" className="hover:text-white transition-colors">Instagram Reels</Link>
            <Link href="/guides/how-to-download-youtube-shorts" className="hover:text-white transition-colors">YouTube Shorts</Link>
            <Link href="/guides/how-to-download-tiktok-videos" className="hover:text-white transition-colors">TikTok Videos</Link>
            <Link href="/guides/how-to-save-pinterest-videos" className="hover:text-white transition-colors">Pinterest Videos</Link>
            <Link href="/guides/faq-hub" className="hover:text-white transition-colors">FAQ Hub</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Fast Video Saver. All rights reserved.</p>
        <p className="mt-2">Disclaimer: We do not host any files on our servers. Users must have rights to download the content.</p>
      </div>
    </footer>
  );
}
