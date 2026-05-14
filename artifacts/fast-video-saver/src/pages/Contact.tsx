import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Clock, CalendarDays, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    
    setError("");
    setIsSubmitted(true);
    // Real backend submission would happen here
  };

  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-primary/30 selection:text-white pb-16 md:pb-0 page-transition">
      <Helmet>
        <title>Contact Us - Fast Video Saver</title>
        <meta name="description" content="Get in touch with the Fast Video Saver team for support, business inquiries, or general questions." />
      </Helmet>

      <Navbar />

      <main className="flex-1">
        <section className="relative pt-24 pb-12 px-4 overflow-hidden text-center">
          <div className="container mx-auto max-w-4xl relative z-10 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a question or experiencing an issue? We'd love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-8 px-4 mb-20">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 glass-card p-6 md:p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center h-full py-12">
                    <div className="h-16 w-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                    <p className="text-muted-foreground max-w-md">
                      Thank you! We've received your message and will get back to you as soon as possible.
                    </p>
                    <Button variant="outline" className="mt-8" onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", subject: "General Inquiry", message: "" }); }}>
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>
                    {error && (
                      <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Name</label>
                        <Input 
                          placeholder="John Doe" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-white">Email</label>
                        <Input 
                          type="email"
                          placeholder="john@example.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="bg-black/20 border-white/10 text-white"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full h-10 px-3 rounded-md bg-black/20 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      >
                        <option value="General Inquiry" className="bg-slate-900">General Inquiry</option>
                        <option value="Bug Report" className="bg-slate-900">Bug Report</option>
                        <option value="Partnership" className="bg-slate-900">Partnership</option>
                        <option value="Other" className="bg-slate-900">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Message</label>
                      <Textarea 
                        placeholder="How can we help you?" 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="min-h-[150px] bg-black/20 border-white/10 text-white resize-y"
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold">
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
              
              <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="glass-card p-6">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Email Us</h3>
                  <p className="text-muted-foreground text-sm">support@fastvideosaver.com</p>
                </div>
                
                <div className="glass-card p-6">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Response Time</h3>
                  <p className="text-muted-foreground text-sm">Usually within 24-48 hours</p>
                </div>
                
                <div className="glass-card p-6">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CalendarDays className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">Available</h3>
                  <p className="text-muted-foreground text-sm">Monday to Friday<br/>9:00 AM - 6:00 PM EST</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
