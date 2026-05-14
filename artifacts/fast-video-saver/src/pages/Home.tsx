import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DownloadBox } from "@/components/DownloadBox";
import { RecentlyDownloaded } from "@/components/RecentlyDownloaded";
import { PinterestCTA } from "@/components/PinterestCTA";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { TrendingCard, TrendingVideo } from "@/components/TrendingCard";
import { FAQSection } from "@/components/FAQSection";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { SiYoutube, SiInstagram, SiTiktok, SiVimeo, SiX, SiFacebook } from "react-icons/si";

import { TrustBadges } from "@/components/TrustBadges";
import { VisitorCounter } from "@/components/VisitorCounter";
import { Testimonials } from "@/components/Testimonials";
import { ComparisonSection } from "@/components/ComparisonSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { FloatingCTA } from "@/components/FloatingCTA";

const trendingVideos: TrendingVideo[] = [
  { title: "Epic Drone Footage 4K", platform: "YouTube", views: "2.4M", gradient: "bg-gradient-to-br from-red-500/20 to-orange-500/20" },
  { title: "Viral Dance Challenge", platform: "TikTok", views: "8.1M", gradient: "bg-gradient-to-br from-cyan-500/20 to-blue-500/20" },
  { title: "Nature Documentary Clip", platform: "Vimeo", views: "450K", gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20" },
  { title: "Funny Cat Compilation", platform: "Instagram", views: "3.7M", gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20" },
  { title: "Tutorial: React Hooks", platform: "YouTube", views: "892K", gradient: "bg-gradient-to-br from-blue-500/20 to-indigo-500/20" },
  { title: "Travel Vlog: Japan", platform: "YouTube", views: "1.2M", gradient: "bg-gradient-to-br from-rose-500/20 to-red-500/20" },
];

export default function Home() {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/30 selection:text-white pb-16 md:pb-0 page-transition">
      <Helmet>
        <title>Fast Video Saver - Download Any Video Instantly</title>
        <meta name="description" content="Download videos from YouTube, TikTok, Instagram, Twitter, and more. Free, fast, secure, and available in HD quality." />
        <link rel="canonical" href="https://fastvideosaver.app/" />
        <meta property="og:title" content="Fast Video Saver" />
        <meta property="og:description" content="Download any video instantly in HD quality." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative hero-gradient pt-16 pb-20 md:pt-24 md:pb-32 px-4 overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              100% Free & Unlimited
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Download Any Video <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Instantly</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              The fastest way to save videos from across the web. No registration required. Download in HD, 4K, or extract audio in seconds.
            </p>

            <div id="download-box">
              <DownloadBox />
            </div>

            <TrustBadges />

            <div className="mt-16 flex flex-col items-center gap-4 text-sm text-muted-foreground">
              <p>Supported platforms</p>
              <div className="flex flex-wrap justify-center gap-6 text-white/50">
                <SiYoutube className="h-6 w-6 hover:text-red-500 transition-colors cursor-help" title="YouTube" />
                <SiInstagram className="h-6 w-6 hover:text-pink-500 transition-colors cursor-help" title="Instagram" />
                <SiTiktok className="h-6 w-6 hover:text-white transition-colors cursor-help" title="TikTok" />
                <SiX className="h-6 w-6 hover:text-blue-400 transition-colors cursor-help" title="Twitter/X" />
                <SiFacebook className="h-6 w-6 hover:text-blue-600 transition-colors cursor-help" title="Facebook" />
                <SiVimeo className="h-6 w-6 hover:text-blue-400 transition-colors cursor-help" title="Vimeo" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 text-center">
          <div className="container mx-auto max-w-3xl">
            <p className="text-muted-foreground leading-relaxed">
              Fast Video Saver is the most reliable free online video downloader supporting YouTube video downloader, 
              Instagram Reel downloader, TikTok video downloader, YouTube Shorts downloader, Facebook video downloader, 
              and Twitter video downloader — all in one place. Save videos in HD quality with no software installation required.
            </p>
          </div>
        </section>

        <VisitorCounter />

        <HowItWorks />

        <Testimonials />

        <RecentlyDownloaded />

        {/* Trending Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white">Trending Downloads</h2>
              <div className="text-sm font-medium text-primary hover:text-primary/80 cursor-pointer">View all</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingVideos.map((video, index) => (
                <TrendingCard key={index} video={video} />
              ))}
            </div>
          </div>
        </section>

        <FeaturesGrid />
        
        <ComparisonSection />

        <PinterestCTA />
        
        <NewsletterSection />

        <FAQSection />

      </main>

      <Footer />
      <FloatingCTA />
      <MobileBottomNav />
    </div>
  );
}
