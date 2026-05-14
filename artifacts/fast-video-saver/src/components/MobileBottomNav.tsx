import { Link, useLocation } from "wouter";
import { Home, Info, Mail, Shield, FileText } from "lucide-react";

export function MobileBottomNav() {
  const [location] = useLocation();
  
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Mail },
    { href: "/privacy-policy", label: "Privacy", icon: Shield },
    { href: "/terms", label: "Terms", icon: FileText },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-white/10 bg-background/95 backdrop-blur-md">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}
                  className={"flex flex-col items-center gap-1 px-3 py-1 rounded-lg transition-colors " + 
                             (isActive ? "text-primary" : "text-muted-foreground hover:text-white")}
                  data-testid={"mobile-nav-" + item.label.toLowerCase()}>
              <item.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
