import { useState, useEffect } from "react";
import { Clipboard, Download, CheckCircle2, Copy } from "lucide-react";
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
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [videoSize, setVideoSize] = useState<string>("");
  const [videoPlatform, setVideoPlatform] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setPlatform(detectPlatform(url));
    setDownloadUrl(null);
    setVideoSize("");
    setVideoPlatform("");
    setError(null);
  }, [url]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      toast({ title: "Failed to read clipboard", variant: "destructive" });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast({ title: "Copied!" });
    } catch {
      toast({ title: "Failed to copy", variant: "destructive" });
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      toast({ title: "Please enter a valid URL", variant: "destructive" });
      return;
    }

    setLoading(true);
    setDownloadUrl(null);
    setVideoSize("");
    setVideoPlatform("");
    setError(null);

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setDownloadUrl(data.videoUrl);
        setVideoSize(data.size);
        setVideoPlatform(data.platform);
        toast({ 
          title: "Ready!", 
          description: `Size: ${data.size} | Platform: ${data.platform}` 
        });
      } else {
        setError(data.error);
        toast({ title: "Error", description: data.error, variant: "destructive" });
      }
    } catch {
      setError("Network error. Please try again.");
      toast({ title: "Error", description: "Network error.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <div className="glass-card p-6 md:p-8 flex flex-col gap-6">
        
        <div className="relative flex items-center">
          <Input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video URL here..." 
            className="h-16 pl-6 pr-32 text-lg bg-black/20 border-white/10 text-white placeholder:text-muted-foreground rounded-xl"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {url && (
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white h-10 w-10" onClick={handleCopy}>
                <Copy className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white h-10 w-10" onClick={handlePaste}>
              <Clipboard className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {platform && (
          <div className="flex justify-center -mt-2">
            <div style={{ backgroundColor: platform.bgColor, borderColor: platform.color + "40" }}
                 className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium">
              <PlatformIcon name={platform.name} color={platform.color} />
              <span style={{ color: platform.color }}>{platform.name} detected</span>
              <CheckCircle2 className="h-4 w-4 text-green-400" />
            </div>
          </div>
        )}
        
        <Button 
          size="lg" 
          className="h-16 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white w-full md:w-auto self-center px-12"
          onClick={handleDownload}
          disabled={loading}
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

        {error && (
          <div className="text-center text-red-400 text-sm p-3 bg-red-500/10 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {downloadUrl && (
          <div className="mt-4 pt-6 border-t border-white/10 animate-fade-in text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <p className="text-white font-medium mb-2">Your video is ready!</p>
            
            {/* REAL SIZE YAHAN DIKHEGA */}
            <p className="text-sm text-gray-400 mb-4">
              📦 Size: {videoSize || 'Unknown'} | 🎬 {videoPlatform || 'Video'}
            </p>
            
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-colors"
            >
              <Download className="h-5 w-5" />
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
                             }
