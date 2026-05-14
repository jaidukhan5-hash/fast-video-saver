import { useState, useEffect } from "react";
import { Clipboard, Download, CheckCircle2, Copy } from "lucide-react";
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
      alert("Failed to read clipboard");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Copied!");
    } catch {
      alert("Failed to copy");
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
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
        alert(`Ready! Size: ${data.size} | Platform: ${data.platform}`);
      } else {
        setError(data.error);
        alert("Error: " + data.error);
      }
    } catch {
      setError("Network error. Please try again.");
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-fade-in">
      <div className="glass-card p-6 md:p-8 flex flex-col gap-6">
        
        <div className="relative flex items-center">
          <input 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste video URL here..." 
            className="h-16 pl-6 pr-32 text-lg bg-black/20 border border-white/10 text-white placeholder-gray-400 rounded-xl w-full"
          />
          <div className="absolute right-2 flex items-center gap-1">
            {url && (
              <button 
                className="text-gray-400 hover:text-white h-10 w-10 flex items-center justify-center"
                onClick={handleCopy}
              >
                <Copy className="h-5 w-5" />
              </button>
            )}
            <button 
              className="text-gray-400 hover:text-white h-10 w-10 flex items-center justify-center"
              onClick={handlePaste}
            >
              <Clipboard className="h-5 w-5" />
            </button>
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
        
        <button 
          className="h-16 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto self-center px-12 transition-colors"
          onClick={handleDownload}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Processing...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Download className="h-6 w-6" />
              Download Now
            </span>
          )}
        </button>

        {error && (
          <div className="text-center text-red-400 text-sm p-3 bg-red-500/10 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        {downloadUrl && (
          <div className="mt-4 pt-6 border-t border-white/10 animate-fade-in text-center">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <p className="text-white font-medium mb-2">Your video is ready!</p>
            
            <p className="text-sm text-gray-400 mb-4">
              📦 Size: {videoSize || 'Unknown'} | 🎬 {videoPlatform || 'Video'}
            </p>
            
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
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
