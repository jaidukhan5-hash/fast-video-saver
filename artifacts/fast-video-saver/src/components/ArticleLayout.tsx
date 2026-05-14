import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Clock, ChevronRight, Share2, Facebook, Twitter, Link2, ArrowRight } from "lucide-react";
import { SiPinterest } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface RelatedGuide {
  title: string;
  href: string;
  description: string;
  readTime: string;
}

interface ArticleLayoutProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  readTime: string;          // e.g. "8 min read"
  publishDate: string;       // e.g. "January 2025"
  breadcrumbs: { label: string; href?: string }[];
  toc: TOCItem[];
  relatedGuides: RelatedGuide[];
  faqSchema?: { question: string; answer: string }[];
  children: React.ReactNode;
}

export function ArticleLayout({
  title, description, canonical, readTime, publishDate,
  breadcrumbs, toc, relatedGuides, faqSchema, children
}: ArticleLayoutProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : canonical;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background page-transition pb-16 md:pb-0">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqSchema.map(f => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": { "@type": "Answer", "text": f.answer }
              }))
            })}
          </script>
        )}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbs.map((b, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": b.label,
              ...(b.href ? { "item": `https://fastvideoserver.replit.app${b.href}` } : {})
            }))
          })}
        </script>
      </Helmet>

      <Navbar />

      <main className="flex-1">
        {/* Hero Banner */}
        <div className="hero-gradient py-12 px-4 border-b border-white/5">
          <div className="container mx-auto max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 flex-wrap" aria-label="Breadcrumb">
              {breadcrumbs.map((b, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3 shrink-0" />}
                  {b.href ? (
                    <Link href={b.href} className="hover:text-white transition-colors">{b.label}</Link>
                  ) : (
                    <span className="text-white/70">{b.label}</span>
                  )}
                </span>
              ))}
            </nav>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
              {title}
            </h1>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl">{description}</p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>{readTime}</span>
              </div>
              <span>·</span>
              <span>Updated {publishDate}</span>
            </div>

            {/* Share buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                <Share2 className="h-4 w-4" /> Share:
              </span>
              <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(title)}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/10 border border-red-600/20 text-red-400 hover:bg-red-600/20 transition-colors text-xs font-medium"
                 data-testid="share-pinterest">
                <SiPinterest className="h-3.5 w-3.5" /> Pinterest
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition-colors text-xs font-medium"
                 data-testid="share-twitter">
                <Twitter className="h-3.5 w-3.5" /> Twitter/X
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-600/20 text-blue-400 hover:bg-blue-600/20 transition-colors text-xs font-medium"
                 data-testid="share-facebook">
                <Facebook className="h-3.5 w-3.5" /> Facebook
              </a>
              <button onClick={handleCopyLink}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors text-xs font-medium"
                      data-testid="share-copy-link">
                <Link2 className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Content area: TOC sidebar + article */}
        <div className="container mx-auto max-w-6xl px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Sidebar TOC — sticky on desktop */}
            <aside className="lg:w-64 shrink-0">
              <div className="glass-card p-5 lg:sticky lg:top-24">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Table of Contents</h3>
                <nav className="space-y-1">
                  {toc.map((item) => (
                    <a key={item.id} href={`#${item.id}`}
                       className={`block text-sm transition-colors hover:text-primary py-1 ${
                         item.level === 2
                           ? "text-white/80 font-medium"
                           : "text-muted-foreground pl-3 border-l border-white/10 text-xs"
                       }`}>
                      {item.title}
                    </a>
                  ))}
                </nav>

                {/* Download CTA in sidebar */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-xs text-muted-foreground mb-3">Ready to download videos?</p>
                  <Button asChild size="sm" className="w-full bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg"
                          data-testid="sidebar-cta">
                    <Link href="/">Try It Free <ArrowRight className="h-3.5 w-3.5 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            </aside>

            {/* Article content */}
            <article className="flex-1 min-w-0">
              <div className="prose prose-invert prose-blue max-w-none
                prose-headings:font-bold prose-headings:text-white
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-white prose-strong:font-semibold
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ul:space-y-1 prose-ol:space-y-1
                prose-blockquote:border-primary prose-blockquote:text-muted-foreground
              ">
                {children}
              </div>

              {/* Inline CTA after article */}
              <div className="mt-12 p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Download?</h3>
                <p className="text-muted-foreground mb-6">Try Fast Video Saver — free, fast, no signup required.</p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 rounded-xl"
                        data-testid="article-cta">
                  <Link href="/">Download Any Video Now <ArrowRight className="h-5 w-5 ml-2" /></Link>
                </Button>
              </div>

              {/* Related Guides */}
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6">Related Guides</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedGuides.map((guide, i) => (
                    <Link key={i} href={guide.href}
                          className="group glass-card p-5 block hover:border-primary/30 transition-colors"
                          data-testid={`related-guide-${i}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {guide.readTime}
                        </span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <h4 className="font-semibold text-white group-hover:text-primary transition-colors text-sm leading-tight mb-2">
                        {guide.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">{guide.description}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
