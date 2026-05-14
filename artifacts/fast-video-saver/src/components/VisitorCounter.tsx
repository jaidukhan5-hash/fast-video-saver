import { useState, useEffect, useRef } from "react";
import { Users, Download } from "lucide-react";

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const startRef = useRef<number | null>(null);
  
  useEffect(() => {
    const start = Date.now();
    startRef.current = start;
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [target, duration]);
  
  return count;
}

export function VisitorCounter() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  
  const downloads = useCountUp(mounted ? 2847193 : 0, 2500);
  const users = useCountUp(mounted ? 48291 : 0, 2000);
  
  return (
    <div className="flex flex-wrap justify-center gap-8 py-12 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Download className="h-5 w-5 text-primary" />
          <span className="text-3xl font-bold text-white">{downloads.toLocaleString()}+</span>
        </div>
        <p className="text-sm text-muted-foreground">Videos Downloaded</p>
      </div>
      <div className="w-px bg-white/10 hidden md:block" />
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-3xl font-bold text-white">{users.toLocaleString()}+</span>
        </div>
        <p className="text-sm text-muted-foreground">Happy Users Today</p>
      </div>
    </div>
  );
}
