import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="glass-card p-8 md:p-12 text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Get tips on downloading videos faster, platform updates, and new feature announcements. No spam, ever.
          </p>
          
          {submitted ? (
            <div className="flex items-center justify-center gap-3 text-green-400 animate-fade-in">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-medium">You're subscribed! Thank you.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-black/20 border-white/10 text-white placeholder:text-muted-foreground"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 shrink-0"
                      data-testid="button-newsletter-submit">
                Subscribe <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </form>
          )}
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <p className="mt-4 text-xs text-muted-foreground">Join 14,000+ subscribers. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
