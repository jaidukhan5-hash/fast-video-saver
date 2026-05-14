import { Zap, ShieldCheck, MonitorSmartphone, Infinity, Sparkles, UserX } from "lucide-react";

export function FeaturesGrid() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Speed",
      description: "Our optimized servers ensure your videos are processed and downloaded in seconds, not minutes."
    },
    {
      icon: Sparkles,
      title: "HD Quality",
      description: "Download videos in their original, uncompressed quality. We support 1080p, 4K, and 8K resolutions."
    },
    {
      icon: ShieldCheck,
      title: "Secure & Private",
      description: "Your privacy is protected. We don't store your downloads or track your activity. 100% safe to use."
    },
    {
      icon: MonitorSmartphone,
      title: "Cross-Platform",
      description: "Works flawlessly on PC, Mac, iOS, and Android. No need to install any apps or extensions."
    },
    {
      icon: Infinity,
      title: "Free Forever",
      description: "No subscriptions, no hidden fees, no credit card required. Download unlimited videos for free."
    },
    {
      icon: UserX,
      title: "No Registration",
      description: "Start downloading immediately. We don't force you to create an account or provide an email."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The most reliable and feature-rich video downloader on the web.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="p-6 rounded-2xl bg-black/20 border border-white/5 hover:bg-white/[0.02] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
