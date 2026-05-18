import { useCredits, PlanType } from "@/contexts/CreditsContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Crown, Zap, Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const plans = [
  {
    id: "basic_premium" as PlanType,
    name: "Basic Premium",
    price: "$4.99/mo",
    icon: Zap,
    features: [
      "Unlimited daily practice",
      "No credit restrictions",
      "All lesson levels",
    ],
    popular: false,
  },
  {
    id: "pro" as PlanType,
    name: "Pro Plan",
    price: "$9.99/mo",
    icon: Crown,
    features: [
      "Everything in Basic",
      "Priority AI responses",
      "Advanced lessons",
      "Exclusive content",
      "Offline access",
    ],
    popular: true,
  },
];

const creditPacks = [
  { amount: 10, price: "$0.99" },
  { amount: 50, price: "$3.99" },
];

const Upgrade = () => {
  const { plan, upgradePlan, buyCredits } = useCredits();
  const navigate = useNavigate();

  const handleUpgrade = (planId: PlanType) => {
    upgradePlan(planId);
    toast({ title: "Plan upgraded! 🎉", description: `You're now on the ${planId === "pro" ? "Pro" : "Basic Premium"} plan.` });
    navigate("/dashboard");
  };

  const handleBuyCredits = (amount: number) => {
    buyCredits(amount);
    toast({ title: `+${amount} credits added! ⚡`, description: "Keep learning!" });
  };

  return (
    <div className="pt-6 space-y-6 pb-8">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-display text-2xl font-bold text-foreground">Upgrade</h1>
      </div>

      <p className="text-muted-foreground text-sm">
        Unlock unlimited learning and premium features.
      </p>

      {/* Plans */}
      <div className="space-y-4">
        {plans.map((p, i) => {
          const Icon = p.icon;
          const isActive = plan === p.id;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "glass-card rounded-2xl p-5 relative overflow-hidden",
                p.popular && "border-primary/50",
                isActive && "border-success/50"
              )}
            >
              {p.popular && (
                <span className="absolute top-3 right-3 text-xs font-semibold gradient-purple text-foreground px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3" /> Popular
                </span>
              )}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground">{p.name}</h3>
                  <p className="text-sm text-accent font-semibold">{p.price}</p>
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => handleUpgrade(p.id)}
                disabled={isActive}
                className={cn(
                  "w-full rounded-xl font-display font-semibold",
                  isActive
                    ? "bg-success/20 text-success border-0"
                    : "gradient-purple border-0 text-foreground"
                )}
              >
                {isActive ? "Current Plan" : "Upgrade Now"}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Credit packs */}
      {plan === "free" && (
        <div>
          <h2 className="font-display font-semibold text-foreground mb-3">Buy Credits</h2>
          <div className="grid grid-cols-2 gap-3">
            {creditPacks.map((pack) => (
              <button
                key={pack.amount}
                onClick={() => handleBuyCredits(pack.amount)}
                className="glass-card rounded-xl p-4 text-center hover:glow-purple transition-all active-scale"
              >
                <Zap className="h-6 w-6 text-accent mx-auto mb-1" />
                <p className="font-display font-bold text-foreground">{pack.amount} Credits</p>
                <p className="text-xs text-muted-foreground">{pack.price}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Upgrade;
