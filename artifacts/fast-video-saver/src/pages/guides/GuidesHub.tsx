import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, Clock, ArrowRight, TrendingUp, Star, Zap,
  ChevronRight, Share2, BookOpen, Filter
} from "lucide-react";
import { SiYoutube, SiInstagram, SiTiktok, SiPinterest } from "react-icons/si";

const ALL_GUIDES = [
  {
    id: "instagram-reels",
    title: "How to Download Instagram Reels",
    description: "Save any Instagram Reel to your phone or computer in seconds. No app needed, no watermark, completely free. Works on iOS and Android.",
    href: "/guides/how-to-download-instagram-reels",
    category: "Instagram",
    readTime: "8 min read",
    icon: SiInstagram,
    iconColor: "text-pink-500",
    gradient: "from-pink-600/20 via-purple-600/10 to-transparent",
    borderColor: "border-pink-500/20",
    accentColor: "bg-pink-500/10",
    featured: true,
    trending: true,
    recentlyUpdated: true,
    tags: ["instagram", "reels", "video downloader"],
    difficulty: "Beginner",
    saveCount: "48K saves",
  },
  {
    id: "youtube-shorts",
    title: "How to Download YouTube Shorts",
    description: "Download YouTube Shorts in HD quality — no software required. Get the full video file on any device in just three easy steps.",
    href: "/guides/how-to-download-youtube-shorts",
    category: "YouTube",
    readTime: "7 min read",
    icon: SiYoutube,
    iconColor: "text-red-500",
    gradient: "from-red-600/20 via-orange-600/10 to-transparent",
    borderColor: "border-red-500/20",
    accentColor: "bg-red-500/10",
    featured: true,
    trending: true,
    recentlyUpdated: false,
    tags: ["youtube", "shorts", "video downloader"],
    difficulty: "Beginner",
    saveCount: "62K saves",
  },
  {
    id: "tiktok-videos",
    title: "How to Download TikTok Videos Without Watermark",
    description: "Remove TikTok watermarks and save clean video files. The definitive guide to watermark-free TikTok downloads in 2025.",
    href: "/guides/how-to-download-tiktok-videos",
    category: "TikTok",
    readTime: "9 min read",
    icon: SiTiktok,
    iconColor: "text-cyan-400",
    gradient: "from-cyan-600/20 via-blue-600/10 to-transparent",
    borderColor: "border-cyan-500/20",
    accentColor: "bg-cyan-500/10",
    featured: false,
    trending: true,
    recentlyUpdated: true,
    tags: ["tiktok", "watermark", "video downloader"],
    difficulty: "Beginner",
    saveCount: "91K saves",
  },
  {
    id: "pinterest-videos",
    title: "How to Save Pinterest Videos to Your Device",
    description: "Found a great Pinterest video? Save it directly to your phone or computer in HD. Works with pins, idea pins, and video boards.",
    href: "/guides/how-to-save-pinterest-videos",
    category: "Pinterest",
    readTime: "6 min read",
    icon: SiPinterest,
    iconColor: "text-red-500",
    gradient: "from-red-700/20 via-red-600/10 to-transparent",
    borderColor: "border-red-600/20",
    accentColor: "bg-red-600/10",
    featured: false,
    trending: false,
    recentlyUpdated: true,
    tags: ["pinterest", "video downloader", "save video"],
    difficulty: "Beginner",
    saveCount: "29K saves",
  },
  {
    id: "best-tools",
    title: "Best Free Video Downloader Tools of 2025",
    description: "An unbiased comparison of the top free video downloader tools. Which one is fastest, safest, and supports the most platforms?",
    href: "/guides/best-free-video-downloader-tools",
    category: "Comparison",
    readTime: "10 min read",
    icon: Star,
    iconColor: "text-amber-400",
    gradient: "from-amber-600/20 via-yellow-600/10 to-transparent",
    borderColor: "border-amber-500/20",
    accentColor: "bg-amber-500/10",
    featured: true,
    trending: false,
    recentlyUpdated: false,
    tags: ["best tools", "comparison", "video downloader"],
    difficulty: "Intermediate",
    saveCount: "17K saves",
  },
  {
    id: "faq-hub",
    title: "Video Downloader FAQ Hub: Everything You Need to Know",
    description: "50+ questions answered about downloading videos online. Covers all platforms, formats, safety, and troubleshooting.",
    href: "/guides/faq-hub",
    category: "FAQ",
    readTime: "15 min read",
    icon: BookOpen,
    iconColor: "text-blue-400",
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    borderColor: "border-blue-500/20",
    accentColor: "bg-blue-500/10",
    featured: false,
    trending: false,
    recentlyUpdated: false,
    tags: ["faq", "help", "troubleshooting"],
    difficulty: "All Levels",
    saveCount: "11K saves",
  },
];

const CATEGORIES = ["All", "YouTube", "Instagram", "TikTok", "Pinterest", "Comparison", "FAQ"];

function FeaturedCard({ guide }: { guide: typeof ALL_GUIDES[0] }) {
  const Icon = guide.icon;
  return (
    <Link href={guide.href}
          className="group relative glass-card overflow-hidden block hover:-translate-y-1 transition-all duration-300 hover:border-white/20"
          data-testid={`featured-card-${guide.id}`}>
      {/* Gradient header strip */}
      <div className={`h-2 w-full bg-gradient-to-r ${guide.gradient}`} />
      <div className="p-6">
        {/* Top badges row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-xl ${guide.accentColor} border ${guide.borderColor} flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${guide.iconColor}`} />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold">
              Featured
            </span>
            {guide.recentlyUpdated && (
              <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Recently Updated
              </span>
            )}
          </div>
        </div>

        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold mb-3 ${guide.accentColor} border ${guide.borderColor} ${guide.iconColor}`}>
          {guide.category}
        </span>
        <h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {guide.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-5">
          {guide.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{guide.readTime}</span>
            <span className="flex items-center gap-1"><Share2 className="h-3 w-3" />{guide.saveCount}</span>
          </div>
          <span className="text-xs text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Read Guide <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function GuideCard({ guide }: { guide: typeof ALL_GUIDES[0] }) {
  const Icon = guide.icon;
  return (
    <Link href={guide.href}
          className="group break-inside-avoid glass-card overflow-hidden block hover:-translate-y-1 transition-all duration-300 hover:border-white/20 mb-5"
          data-testid={`guide-card-${guide.id}`}>
      {/* Top gradient band */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${guide.gradient}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${guide.accentColor} border ${guide.borderColor}`}>
            <Icon className={`h-3.5 w-3.5 ${guide.iconColor}`} />
            <span className={`text-[11px] font-semibold ${guide.iconColor}`}>{guide.category}</span>
          </div>
          <div className="flex flex-col items-end gap-1">
            {guide.trending && (
              <span className="flex items-center gap-1 text-[10px] text-orange-400 font-medium">
                <TrendingUp className="h-3 w-3" /> Trending
              </span>
            )}
            {guide.recentlyUpdated && (
              <span className="flex items-center gap-1 text-[10px] text-green-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                Updated
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white text-base leading-snug mb-2.5 group-hover:text-primary transition-colors">
          {guide.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {guide.description}
        </p>

        {/* Difficulty badge */}
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-muted-foreground font-medium">
            {guide.difficulty}
          </span>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{guide.readTime}</span>
            <span className="flex items-center gap-1"><Share2 className="h-3 w-3" />{guide.saveCount}</span>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

export default function GuidesHub() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter guides based on search and category
  const filteredGuides = useMemo(() => {
    return ALL_GUIDES.filter(g => {
      const matchesCategory = activeCategory === "All" || g.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch = !q || g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.tags.some(t => t.includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const featuredGuides = ALL_GUIDES.filter(g => g.featured);
  const trendingGuides = ALL_GUIDES.filter(g => g.trending);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background page-transition pb-16 md:pb-0">
      <Helmet>
        <title>Video Download Guides & Tutorials | Fast Video Saver</title>
        <meta name="description" content="Expert guides on downloading videos from Instagram, YouTube, TikTok, Pinterest and more. Step-by-step tutorials, tips, and FAQs — all free." />
        <link rel="canonical" href="https://fastvideoserver.replit.app/guides" />
        <meta property="og:title" content="Video Download Guides & Tutorials | Fast Video Saver" />
        <meta property="og:description" content="Expert guides on downloading videos from Instagram, YouTube, TikTok, Pinterest and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fastvideoserver.replit.app/guides" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Video Download Guides",
            "description": "Expert guides on downloading videos from Instagram, YouTube, TikTok, Pinterest and more.",
            "url": "https://fastvideoserver.replit.app/guides",
            "hasPart": ALL_GUIDES.map(g => ({
              "@type": "Article",
              "name": g.title,
              "description": g.description,
              "url": `https://fastvideoserver.replit.app${g.href}`
            }))
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fastvideoserver.replit.app/" },
              { "@type": "ListItem", "position": 2, "name": "Guides", "item": "https://fastvideoserver.replit.app/guides" }
            ]
          })}
        </script>
      </Helmet>

      <Navbar />

      <section className="relative hero-gradient py-16 md:py-24 px-4 overflow-hidden border-b border-white/5">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/70">Guides</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-6">
            <BookOpen className="h-3.5 w-3.5" />
            {ALL_GUIDES.length} Free Guides
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Video Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Guides</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Step-by-step tutorials for downloading videos from every major platform. Free, beginner-friendly, and updated for 2025.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {[
              { label: "Free Guides", value: "6+" },
              { label: "Platforms Covered", value: "7+" },
              { label: "Monthly Readers", value: "50K+" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-white/5 py-4 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search guides... (e.g. 'instagram reels', 'tiktok watermark')"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-11 pr-4 h-12 bg-black/20 border-white/10 text-white placeholder:text-muted-foreground rounded-xl focus-visible:ring-primary/50 text-sm"
              data-testid="input-guides-search"
            />
            {search && (
              <button onClick={() => setSearch("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white text-xs"
                      data-testid="button-clear-search">
                Clear
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10"
                }`}
                data-testid={`filter-category-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {search === "" && activeCategory === "All" && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                <Star className="h-4 w-4 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Featured Guides</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredGuides.map(guide => <FeaturedCard key={guide.id} guide={guide} />)}
            </div>
          </div>
        </section>
      )}

      {search === "" && activeCategory === "All" && (
        <section className="py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-white">Trending Now</h2>
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold">Hot</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {trendingGuides.map(guide => {
                const Icon = guide.icon;
                return (
                  <Link key={guide.id} href={guide.href}
                        className="shrink-0 w-64 glass-card p-4 block hover:-translate-y-1 transition-all duration-300 hover:border-white/20 group"
                        data-testid={`trending-card-${guide.id}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${guide.accentColor} flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${guide.iconColor}`} />
                      </div>
                      <span className={`text-[10px] font-semibold ${guide.iconColor}`}>{guide.category}</span>
                      {guide.recentlyUpdated && (
                        <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          Updated
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-white text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{guide.readTime}</span>
                      <span>·</span>
                      <TrendingUp className="h-3 w-3 text-orange-400" />
                      <span className="text-orange-400">{guide.saveCount}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-white">
                {search || activeCategory !== "All" ? "Search Results" : "All Guides"}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredGuides.length} guide{filteredGuides.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-white mb-2">No guides found</h3>
              <p className="text-muted-foreground text-sm mb-6">Try a different search term or category.</p>
              <Button onClick={() => { setSearch(""); setActiveCategory("All"); }}
                      variant="outline" className="border-white/10" data-testid="button-reset-filters">
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
              {filteredGuides.map(guide => <GuideCard key={guide.id} guide={guide} />)}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative glass-card p-8 md:p-12 text-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/5 rounded-2xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Download Any Video?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                Now that you know how — try Fast Video Saver. Paste any video URL and download in seconds. Free, no signup, HD quality.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg"
                        className="bg-primary hover:bg-primary/90 text-white font-bold px-10 h-13 rounded-xl shadow-lg shadow-primary/20 animate-pulse-glow"
                        data-testid="guides-cta-download">
                  <Link href="/">Download a Video Now <ArrowRight className="h-5 w-5 ml-2" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline"
                        className="border-white/20 text-white hover:bg-white/5 rounded-xl"
                        data-testid="guides-cta-faq">
                  <Link href="/guides/faq-hub">Read the FAQ Hub</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <Share2 className="h-4 w-4" /> Share these guides:
            </span>
            <a href="https://pinterest.com/pin/create/button/?url=https://fastvideoserver.replit.app/guides"
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400 hover:bg-red-600/20 transition-colors text-xs font-medium"
               data-testid="share-hub-pinterest">
              <SiPinterest className="h-3.5 w-3.5" /> Save to Pinterest
            </a>
            <a href="https://twitter.com/intent/tweet?url=https://fastvideoserver.replit.app/guides&text=Best%20video%20download%20guides%20for%202025"
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-colors text-xs font-medium"
               data-testid="share-hub-twitter">
              Share on X
            </a>
          </div>
        </div>
      </section>

      <NewsletterSection />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
