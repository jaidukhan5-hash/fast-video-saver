import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "./pages/Home";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GuidesHub from "./pages/guides/GuidesHub";
import InstagramReels from "./pages/guides/InstagramReels";
import YouTubeShorts from "./pages/guides/YouTubeShorts";
import TikTokVideos from "./pages/guides/TikTokVideos";
import PinterestVideos from "./pages/guides/PinterestVideos";
import BestTools from "./pages/guides/BestTools";
import FAQHub from "./pages/guides/FAQHub";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms" component={Terms} />
      <Route path="/guides" component={GuidesHub} />
      <Route path="/guides/how-to-download-instagram-reels" component={InstagramReels} />
      <Route path="/guides/how-to-download-youtube-shorts" component={YouTubeShorts} />
      <Route path="/guides/how-to-download-tiktok-videos" component={TikTokVideos} />
      <Route path="/guides/how-to-save-pinterest-videos" component={PinterestVideos} />
      <Route path="/guides/best-free-video-downloader-tools" component={BestTools} />
      <Route path="/guides/faq-hub" component={FAQHub} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
