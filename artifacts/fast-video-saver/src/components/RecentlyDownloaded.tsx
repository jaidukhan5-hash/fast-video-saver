import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecentItem {
  url: string;
  platform: string;
  format: string;
  timestamp: number;
}

export function RecentlyDownloaded() {
  const [items, setItems] = useState<RecentItem[]>([]);
  
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("recentDownloads") || "[]");
    setItems(stored);
  }, []);
  
  if (items.length === 0) return null; // hide if empty
  
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recently Downloaded
        </h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="glass-card p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{item.url}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.platform} · {item.format} · {new Date(item.timestamp).toLocaleDateString()}</p>
              </div>
              <Button size="sm" variant="outline" onClick={() => window.location.href = "/"}>
                Download Again
              </Button>
            </div>
          ))}
        </div>
        <button onClick={() => { localStorage.removeItem("recentDownloads"); setItems([]); }}
                className="mt-3 text-xs text-muted-foreground hover:text-white transition-colors">
          Clear history
        </button>
      </div>
    </section>
  );
}
