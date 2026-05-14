import { useState, useEffect } from "react";
import { Clipboard, Download, CheckCircle2, Film, Music, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  SiYoutube, SiInstagram, SiTiktok, SiX, SiFacebook, SiVimeo, SiPinterest 
} from "react-icons/si";

function detectPlatform(url: string): { name: string; color: string; bgColor: string } | null {
  if (/youtube\.com|youtu\.be/.test(url)) return { name: "YouTube", color: "#FF0000", bgColor: "rgba(255,0,0,0.1)" };
  if (/instagram\.com/.test(url)) return { name: "Instagram", color: "#E1306C", bgColor: "rgba(225,48,108,0.1)" };
  if (/tiktok\.com/.test(url)) return { name: "TikTok", color: "#69C9D0", bgColor: "rgba(105,201,208,0.1)" };
  if (/twitter\.com|x\.com/.test(url)) return { name: "Twitter/X", color: "#1DA1F2", bgColor: "rgba(29,161,242,0.1)" };
  if (/facebook\.com|fb\.watch/.test(url)) return { name: "Facebook", color: "#1877F2", bgColor: "rgba(24,119,242,0.1)" };
  if (/vimeo\.com/.test(url)) return { name: "Vimeo", color: "#19B7EA", bgColor: "rgba(25,183,234,0.1)" };
  if (/pinterest\.com/.test(url)) return { name: "Pinterest", color: "#E60023", bgColor: "rgba(230,0,35,0.1)" };
  return null;
}

const PlatformIcon = ({ name, color }: { name: string; color: string }) => {
  const props = { className: "h-4 w-4", style: { color } };
  switch (name) {
    case "YouTube": return <SiYoutube {...props} />;
    case "Instagram": return <SiInstagram {...props} />;
    case "TikTok": return <SiTiktok {...props} />;
    case "Twitter/X": return <SiX {...props} />;
    case "Facebook": return <SiFacebook {...props} />;
    case "Vimeo": return <SiVimeo {...props} />;
    case "Pinterest": return <SiPinterest {...props} />;
    default: return null;
  }
};

export function DownloadBox() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState<{ name: string; color: string; bgColor: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showFormats, setShowFormats] = useState(false);
  const [formatStatus, setFormatStatus] = useState<Record<number, 'idle' | 'downloading' | 'complete'>>({});
  const { toast } = useToast();

  useEffect(() => {
    setPlatform(detectPlatform(url));
  }, [url]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      toast({ title: "Failed to read clipboard", variant: "destructive" });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Copied!", description: "URL copied to clipboard." });
    } catch (err) {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleDownload = () => {
    if (!url.trim()) {
      toast({ title: "Please enter a valid URL", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    setShowFormats(false);
    setLoadingStep(1);
    
    toast({ title: "Processing your video...", description: "Please wait a moment." });
    
    setTimeout(() => setLoadingStep(2), 1000);
    setTimeout(() => setLoadingStep(3), 2000);
    
    setTimeout(() => {
      setLoading(false);
      setLoadingStep(0);
      setShowFormats(true);
      toast({ title: "Ready to download!", description: "Choose your preferred format." });
    }, 3000);
  };

  const handleFormatDownload = (index: number, formatLabel: string) => {
    setFormatStatus(prev => ({ ...prev, [index]: 'downloading' }));
    
    setTimeout(() => {
      setFormatStatus(prev => ({ ...prev, [index]: 'complete' }));
      
      const recent = JSON.parse(localStorage.getItem("recentDownloads") || "[]");
      const newItem = { url, platform: platform?.name || "Unknown", format: formatLabel, timestamp: Date.now() };
      localStorage.setItem("recentDownloads", JSON.stringify([newItem, ...recent].slice(0, 6)));
      
    }, 2500);
  };

  const formats = [
    { label: "MP4 HD 1080p", icon: Film, size: "124 MB" },
    { label: "MP4 720p", icon: Film, size: "58 MB" },
    { label: "MP4 360p", icon: Film, size: "15 MB" },
    { label: "MP3 Audio", icon: Music, size: "4 MB" }
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in" id="download-box-component">
      <div className="glass-card p-6 md:p-8 flex flex-col gap-6 animate-gradient-border transition-all duration-300">
        
        <div className="relative flex items-center">
          <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video URL here..." 
            className="h-16 pl-6 pr-32 text-lg bg-black/20 border-white/10 text-white placeholder:text-muted-foreground rounded-xl focus-visible:ring-primary/50"
            data-testid="input-video-url"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {url && (
              <Button 
                variant="ghost" 
                size="icon"
                className="text-muted-foreground hover:text-white h-10 w-10"
                onClick={handleCopy}
                data-testid="button-copy"
                title="Copy typed URL"
              >
                <Copy className="h-5 w-5" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-muted-foreground hover:text-white h-10 w-10"
              onClick={handlePaste}
              data-testid="button-paste"
              title="Paste from clipboard"
            >
              <Clipboard className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {platform && (
          <div className="flex justify-center -mt-2">
            <div style={{ backgroundColor: platform.bgColor, borderColor: platform.color + "40" }}
                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium animate-fade-in">
              <PlatformIcon name={platform.name} color={platform.color} />
              <span style={{ color: platform.color }}>{platform.name} detected</span>
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </div>
          </div>
        )}
        
        <Button 
          size="lg" 
          className="h-16 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white animate-pulse-glow w-full md:w-auto self-center px-12"
          onClick={handleDownload}
          disabled={loading}
          data-testid="button-download"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Processing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Download className="h-6 w-6" />
              Download Now
            </span>
          )}
        </Button>

        {loading && (
          <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">
            <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-primary animate-progress-fill rounded-full" />
            </div>
            <div className="text-sm text-center text-muted-foreground animate-pulse">
              {loadingStep === 1 && "Analyzing URL..."}
              {loadingStep === 2 && "Fetching video info..."}
              {loadingStep === 3 && "Preparing formats..."}
            </div>
          </div>
        )}

        {showFormats && (
          <div className="mt-4 pt-6 border-t border-white/10 animate-fade-in">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Available Formats
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formats.map((format, i) => {
                const status = formatStatus[i] || 'idle';
                return (
                  <div key={i} className="flex flex-col p-4 rounded-lg bg-black/20 border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden">
                    {status === 'downloading' && (
                      <div className="absolute inset-0 bg-primary/10 -z-10 animate-shimmer" />
                    )}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                        <format.icon className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-medium text-white">{format.label}</div>
                          <div className="text-xs text-muted-foreground">{format.size}</div>
                        </div>
                      </div>
                      
                      {status === 'idle' && (
                        <Button size="sm" onClick={() => handleFormatDownload(i, format.label)} data-testid={`button-download-format-${i}`}>
                          Download
                        </Button>
                      )}
                      
                      {status === 'downloading' && (
                        <div className="text-xs text-primary font-medium flex items-center gap-1">
                          <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></span>
                          Downloading...
                        </div>
                      )}
                      
                      {status === 'complete' && (
                        <div className="text-xs text-green-400 font-medium flex items-center gap-1 animate-fade-in">
                          <CheckCircle2 className="h-4 w-4" />
                          Complete
                        </div>
                      )}
                    </div>
                    
                    {status === 'downloading' && (
                      <div className="mt-3 h-1 w-full bg-black/40 rounded-full overflow-hidden">
                        <div className="h-full bg-primary animate-progress-fill-fast rounded-full" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
