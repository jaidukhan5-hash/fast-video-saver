import { Eye, Play, Bookmark, Download } from "lucide-react";
import { SiYoutube, SiInstagram, SiTiktok, SiVimeo } from "react-icons/si";

export interface TrendingVideo {
  title: string;
  platform: "YouTube" | "TikTok" | "Vimeo" | "Instagram";
  views: string;
  gradient: string;
}

export function TrendingCard({ video }: { video: TrendingVideo }) {
  const platformConfig = {
    YouTube: { icon: SiYoutube, color: "text-red-500", bg: "bg-red-500/20" },
    TikTok: { icon: SiTiktok, color: "text-cyan-400", bg: "bg-cyan-400/20" },
    Vimeo: { icon: SiVimeo, color: "text-blue-400", bg: "bg-blue-400/20" },
    Instagram: { icon: SiInstagram, color: "text-pink-500", bg: "bg-pink-500/20" },
  };
  const platform = platformConfig[video.platform];
  const Icon = platform.icon;

  return (
    <div className="group rounded-2xl overflow-hidden bg-black/40 border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
         data-testid={`card-trending-${video.title.toLowerCase().replace(/\s/g, '-')}`}>
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {/* Hover scale effect wrapper */}
        <div className={`absolute inset-0 ${video.gradient} group-hover:scale-105 transition-transform duration-300`} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

        {/* Platform badge - top left */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm ${platform.color} z-10`}>
          <Icon className="h-3.5 w-3.5" />
          <span className="text-xs font-medium text-white">{video.platform}</span>
        </div>
        {/* Saves badge - top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/80 text-xs z-10">
          <Bookmark className="h-3 w-3" />
          {video.views}
        </div>
        {/* Play button overlay - center */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <Play className="h-5 w-5 text-white fill-white ml-0.5" />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 relative z-20">
        <h3 className="font-semibold text-white text-sm leading-tight mb-3 line-clamp-2">{video.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>{video.views} views</span>
          </div>
          <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1 transition-colors font-medium"
                  data-testid={`button-trending-download-${video.title.toLowerCase().replace(/\s/g, '-')}`}>
            <Download className="h-3.5 w-3.5" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
