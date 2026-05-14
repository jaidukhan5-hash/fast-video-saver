import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Zap, ShieldCheck, Download, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/30 selection:text-white pb-16 md:pb-0 page-transition">
      <Helmet>
        <title>About Us - Fast Video Saver</title>
        <meta name="description" content="Learn more about Fast Video Saver, our mission, and our values. The most reliable free online video downloader." />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        <section className="relative pt-24 pb-16 px-4 overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Fast Video Saver</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              We believe downloading content from the internet should be fast, completely free, and secure. Fast Video Saver is built to provide users with the simplest way to save their favorite moments offline without restrictive paywalls.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 bg-white/5 border-y border-white/10">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <Globe className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Cross-Platform Support</h3>
                <p className="text-muted-foreground text-sm">Download effortlessly from YouTube, TikTok, Instagram, Twitter/X, Pinterest, and Facebook in one place.</p>
              </div>
              <div className="glass-card p-6 flex flex-col items-center text-center">
                <Download className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">High Quality Formats</h3>
                <p className="text-muted-foreground text-sm">Access the highest available resolutions natively, including 1080p, 4K videos, and crystal-clear MP3 audio extraction.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <ShieldCheck className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Privacy First</h3>
                <p className="text-muted-foreground text-sm">We don't log your downloads or store your data. Your activities are completely private.</p>
              </div>
              <div>
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Lightning Speed</h3>
                <p className="text-muted-foreground text-sm">Our highly optimized servers prepare formats in seconds so you never have to wait.</p>
              </div>
              <div>
                <Globe className="h-8 w-8 text-indigo-400 mx-auto mb-3" />
                <h3 className="text-white font-medium mb-2">Always Free</h3>
                <p className="text-muted-foreground text-sm">No premium tiers or locked features. All core functionalities remain permanently free to use.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 mb-8 text-center">
          <div className="container mx-auto max-w-2xl glass-card p-10">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to start downloading?</h2>
            <p className="text-muted-foreground mb-8">Join thousands of users who trust Fast Video Saver daily.</p>
            <Button size="lg" asChild className="h-14 px-8 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90">
              <Link href="/">Try It Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
