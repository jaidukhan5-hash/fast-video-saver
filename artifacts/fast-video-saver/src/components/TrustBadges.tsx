import { ShieldCheck, Zap, Gift, UserX } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "100% Secure", color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  { icon: Zap, label: "Lightning Fast", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  { icon: Gift, label: "Always Free", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { icon: UserX, label: "No Signup", color: "text-purple-400", bg: "bg-purple-400/10 border-purple-400/20" },
];

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in">
      {badges.map((badge, i) => (
        <div key={i}
             className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium ${badge.bg} ${badge.color}`}
             data-testid={`trust-badge-${i}`}>
          <badge.icon className="h-4 w-4" />
          {badge.label}
        </div>
      ))}
    </div>
  );
}
