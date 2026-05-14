import { SiPinterest } from "react-icons/si";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PinterestCTA() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-card p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <SiPinterest className="h-8 w-8 text-red-500" />
              <span className="text-lg font-semibold text-white">Saw a video on Pinterest?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Download Any Pinterest Video Instantly
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Found an amazing video idea on Pinterest? Save it directly to your device in seconds — no apps, no signup, completely free.
            </p>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 h-12 rounded-xl"
                    onClick={() => document.getElementById('download-box')?.scrollIntoView({ behavior: 'smooth' })}
                    data-testid="button-pinterest-cta">
              <ArrowDown className="h-5 w-5 mr-2" />
              Download Pinterest Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
