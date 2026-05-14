import { useState, useEffect } from "react";

const testimonials = [
  { name: "Sarah M.", location: "New York, USA", rating: 5, text: "Works perfectly for Instagram reels! Downloaded over 200 videos without a single issue. This is my go-to tool now.", platform: "Instagram" },
  { name: "James K.", location: "London, UK", rating: 5, text: "Fastest downloader I've ever used. TikTok videos download in seconds and the quality is perfect." , platform: "TikTok" },
  { name: "Priya R.", location: "Mumbai, India", rating: 5, text: "Finally a YouTube downloader that actually works without installing sketchy software. Clean, fast, free.", platform: "YouTube" },
  { name: "Carlos D.", location: "Madrid, Spain", rating: 5, text: "The platform detection is incredibly smart — paste a link and it knows exactly what to do. Impressed!", platform: "Multi" },
  { name: "Emily T.", location: "Toronto, Canada", rating: 5, text: "I use this daily for saving Pinterest videos for my design inspiration board. Absolutely essential tool.", platform: "Pinterest" },
  { name: "Ahmed S.", location: "Dubai, UAE", rating: 5, text: "No registration, no annoying ads blocking the button, just paste and download. Exactly what I needed.", platform: "Facebook" },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      cards.push(testimonials[(activeIndex + i) % testimonials.length]);
    }
    return cards;
  };

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">What Our Users Say</h2>
          <p className="text-muted-foreground">Trusted by thousands of daily users worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-500">
          {getCards().map((t, i) => (
            <div key={activeIndex + "-" + i} className={`glass-card p-6 testimonial-card ${i > 0 ? "hidden md:block" : ""}`} data-testid={`testimonial-${i}`}>
              <div className="text-amber-400 mb-4 text-lg">{'★'.repeat(t.rating)}</div>
              <p className="text-white mb-6 italic leading-relaxed">"{t.text}"</p>
              <div className="flex items-center justify-between mt-auto">
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
                <div className="text-xs px-2 py-1 rounded-md bg-white/10 text-white/80">
                  {t.platform}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"} ${i > 0 && i % 3 !== 0 ? "md:hidden" : ""}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
