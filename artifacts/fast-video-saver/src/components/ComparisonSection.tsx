import { CheckCircle2, XCircle } from "lucide-react";

const features = [
  { feature: "Free to use", us: true, others: false },
  { feature: "No registration required", us: true, others: false },
  { feature: "HD & 4K quality", us: true, others: "Limited" },
  { feature: "Multiple platforms", us: true, others: "Limited" },
  { feature: "No watermarks", us: true, others: false },
  { feature: "Audio extraction (MP3)", us: true, others: false },
  { feature: "Mobile friendly", us: true, others: "Partial" },
  { feature: "No ads blocking content", us: true, others: false },
];

export function ComparisonSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-12">
          Fast Video Saver vs Other Tools
        </h2>
        
        <div className="glass-card overflow-hidden" data-testid="comparison-table">
          <div className="grid grid-cols-3 bg-black/40 border-b border-white/10">
            <div className="p-4 font-semibold text-white/80 flex items-center">Feature</div>
            <div className="p-4 font-bold text-white bg-primary/20 flex items-center justify-center text-center border-x border-primary/30">Fast Video Saver</div>
            <div className="p-4 font-semibold text-white/80 flex items-center justify-center text-center">Other Tools</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {features.map((item, i) => (
              <div key={i} className={`grid grid-cols-3 ${i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}`}>
                <div className="p-4 text-sm md:text-base text-white/90 flex items-center">
                  {item.feature}
                </div>
                <div className="p-4 bg-primary/10 border-x border-primary/20 flex items-center justify-center">
                  {item.us === true ? <CheckCircle2 className="h-5 w-5 text-green-400" /> : <XCircle className="h-5 w-5 text-red-400" />}
                </div>
                <div className="p-4 flex items-center justify-center text-sm font-medium">
                  {item.others === false ? (
                    <XCircle className="h-5 w-5 text-red-400" />
                  ) : item.others === true ? (
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  ) : (
                    <span className="text-amber-400">{item.others}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
