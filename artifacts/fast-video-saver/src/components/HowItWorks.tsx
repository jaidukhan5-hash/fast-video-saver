import { Link2, Settings2, Download } from "lucide-react";

export function HowItWorks() {
  return (
    <section className="py-20 px-4 border-y border-white/5 bg-black/20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Download any video in three simple steps. No software installation required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/50 transition-colors">
              <Link2 className="h-10 w-10 text-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center border-4 border-background">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Paste URL</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Copy the video link from your favorite platform and paste it into our search box above.
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/50 transition-colors">
              <Settings2 className="h-10 w-10 text-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center border-4 border-background">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Choose Format</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Select your preferred video quality (up to 4K) or extract just the audio as MP3.
            </p>
          </div>

          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6 relative z-10 group-hover:border-primary/50 transition-colors">
              <Download className="h-10 w-10 text-primary" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center border-4 border-background">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Download</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Click the download button and your file will be saved directly to your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
